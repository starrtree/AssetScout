import {createHash,createHmac,createDecipheriv,timingSafeEqual} from 'node:crypto';
import {readFileSync} from 'node:fs';
const sheetId='1ljrT6D9KpRr_KS5Eque_W9T88H4tqOjvUUiXWEubDeQ';
const required=['Start Here','Resources','Inspiration Board','🐙 GitHub Deep Dives','🧭 Visual Workspace Blueprint'];
const hash=s=>createHash('sha256').update(s).digest('hex');
const equal=(a,b)=>typeof a==='string'&&typeof b==='string'&&a.length===b.length&&timingSafeEqual(Buffer.from(a),Buffer.from(b));
const sign=(s,key)=>createHmac('sha256',key).update(s).digest('hex');
export function session(token,env,now=Date.now()){
  if(!env.SCOUT_DATA_KEY||!env.SCOUT_ACCESS_HASH||typeof token!=='string'||token.length>200||!equal(hash(token),env.SCOUT_ACCESS_HASH))return null;
  const payload=Buffer.from(JSON.stringify({expires:now+30*86400000})).toString('base64url');
  return payload+'.'+sign(payload,env.SCOUT_DATA_KEY);
}
export function authenticated(cookie,env,now=Date.now()){
  if(!env.SCOUT_DATA_KEY)return false;
  const value=(cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('scout_session='))?.slice(14);
  if(!value)return false;
  const [payload,signature,...extra]=value.split('.');
  if(extra.length||!payload||!signature||!equal(signature,sign(payload,env.SCOUT_DATA_KEY)))return false;
  try{const p=JSON.parse(Buffer.from(payload,'base64url'));return Number.isFinite(p.expires)&&p.expires>now;}catch{return false;}
}
export function decryptSnapshot(env,encrypted=JSON.parse(readFileSync(new URL('../data/motherboard.encrypted.json',import.meta.url)))){
  if(!env.SCOUT_DATA_KEY)throw Error('Source key is not configured');
  const d=createDecipheriv('aes-256-gcm',Buffer.from(env.SCOUT_DATA_KEY,'base64'),Buffer.from(encrypted.iv,'base64'));
  d.setAuthTag(Buffer.from(encrypted.tag,'base64'));
  return JSON.parse(Buffer.concat([d.update(Buffer.from(encrypted.ciphertext,'base64')),d.final()]).toString());
}
function col(n){let s='';while(n){let r=(n-1)%26;s=String.fromCharCode(65+r)+s;n=Math.floor((n-1)/26);}return s;}
export async function liveMotherboard(token){
  const read=async suffix=>{const r=await fetch('https://sheets.googleapis.com/v4/spreadsheets/'+sheetId+suffix,{headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error('Google rejected the read (HTTP '+r.status+').');return r.json();};
  const m=await read('?fields=spreadsheetId,spreadsheetUrl,sheets.properties');
  const props=m.sheets.map(s=>s.properties).filter(p=>p.sheetType==='GRID');
  if(!required.every(t=>props.some(p=>p.title===t)))throw Error('A required Motherboard tab is missing.');
  const tabs=[];
  for(const p of props){const g=p.gridProperties;if(g.rowCount*g.columnCount>250000)throw Error('Tab exceeds the P0 read budget.');const q=new URLSearchParams();for(let i=1;i<=g.rowCount;i+=200)q.append('ranges',`'${p.title.replaceAll("'","''")}'!A${i}:${col(g.columnCount)}${Math.min(i+199,g.rowCount)}`);q.set('valueRenderOption','FORMATTED_VALUE');const result=await read('/values:batchGet?'+q);const values=[];for(const [i,vr]of result.valueRanges.entries()){const v=vr.values||[];values.push(...v);if(i<result.valueRanges.length-1)values.push(...Array.from({length:200-v.length},()=>[]));}while(values.length&&!values.at(-1).length)values.pop();tabs.push({title:p.title,sheetId:p.sheetId,values});}
  return {schemaVersion:1,spreadsheetId:sheetId,sourceUrl:m.spreadsheetUrl,fetchedAt:new Date().toISOString(),mode:'live',tabs};
}
export async function handle(request,env=process.env){
  const url=new URL(request.url),path=url.pathname;
  const json=(data,status=200,extra={})=>Response.json(data,{status,headers:{'Cache-Control':'private, no-store','Vary':'Cookie',...extra}});
  if(path==='/api/session'){
    if(request.method!=='POST')return json({error:'Method not allowed'},405);
    if(request.headers.get('origin')!==url.origin)return json({error:'Same-origin request required'},403);
    if(Number(request.headers.get('content-length')||0)>1024)return json({error:'Request too large'},413);
    try{const text=await request.text();if(text.length>1024)return json({error:'Request too large'},413);const value=session(JSON.parse(text).token,env);if(!value)return json({error:'This access link is invalid or has been replaced.'},401);return json({ok:true},200,{'Set-Cookie':`scout_session=${value}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=2592000`});}catch{return json({error:'Invalid login request'},400);}
  }
  if(!authenticated(request.headers.get('cookie'),env))return json({error:'Open your private access link to unlock this Studio.',code:'authentication_required'},401);
  if(request.method!=='GET')return json({error:'Method not allowed'},405);
  if(path==='/api/health')return json({ok:true,liveConfigured:!!env.GOOGLE_SHEETS_ACCESS_TOKEN});
  if(path==='/api/snapshot'){try{return json(decryptSnapshot(env));}catch{return json({error:'The private source snapshot could not be unlocked.'},503);}}
  if(path==='/api/motherboard'){
    if(!env.GOOGLE_SHEETS_ACCESS_TOKEN)return json({error:'Live Google refresh is not connected yet. Today’s dated Motherboard export is loaded; a future refresh can be delivered without changing your Sheet.',code:'not_configured'},503);
    try{return json(await liveMotherboard(env.GOOGLE_SHEETS_ACCESS_TOKEN));}catch(e){return json({error:e.message+' Current data is unchanged.'},502);}
  }
  return json({error:'Unknown route'},404);
}
