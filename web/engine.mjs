export const SHEET_ID = '1ljrT6D9KpRr_KS5Eque_W9T88H4tqOjvUUiXWEubDeQ';
export const REQUIRED = ['Start Here','Resources','Inspiration Board','🐙 GitHub Deep Dives','🧭 Visual Workspace Blueprint'];
const str = v => v == null ? '' : String(v);
const parts = v => str(v).split(/;\s*/).filter(Boolean);
const slug = s => encodeURIComponent(s.toLowerCase().trim());
export function validateBundle(b) {
  if (b?.schemaVersion !== 1 || b.spreadsheetId !== SHEET_ID || !Array.isArray(b.tabs)) throw Error('Use a version 1 export from the canonical StarrTree Motherboard.');
  if (!b.fetchedAt || !Number.isFinite(Date.parse(b.fetchedAt))) throw Error('Export needs a valid fetchedAt timestamp.');
  if (Date.parse(b.fetchedAt) > Date.now()+60000) throw Error('Export timestamp is in the future.');
  if (!REQUIRED.every(t=>b.tabs.some(s=>s.title===t))) throw Error('Export is missing a required Motherboard tab.');
  if (new Set(b.tabs.map(t=>t.title)).size !== b.tabs.length) throw Error('Duplicate tab names in export.');
  for (const tab of b.tabs) {
    if (!Number.isInteger(tab.sheetId) || !Array.isArray(tab.values) || tab.values.length>10000 || !tab.values.every(r=>Array.isArray(r)&&r.length<=100&&r.every(v=>v===null||['string','number','boolean'].includes(typeof v)))) throw Error('Invalid or oversized tab data.');
  }
  const headers = {'Resources':['Resource Name','URL','Quick Description'], 'Inspiration Board':['Inspiration / Project','Prompt / Visual Keywords','StarrTree Reconstructed Prompt'], '🐙 GitHub Deep Dives':['Repo','GitHub URL','Stack / Framework']};
  for (const [title, names] of Object.entries(headers)) if (!names.every(h=>b.tabs.find(t=>t.title===title).values[0]?.includes(h))) throw Error(`Schema changed in ${title}; review the adapter before importing.`);
  return b;
}
export function normalize(bundle) {
  validateBundle(bundle);
  const records=[];
  for(const tab of bundle.tabs) {
    if(!['Resources','Inspiration Board','🐙 GitHub Deep Dives'].includes(tab.title)) continue;
    const [headers,...rows]=tab.values;
    rows.forEach((row,index)=>{
      if(!row.some(Boolean))return;
      const f=Object.fromEntries(headers.map((h,i)=>[h,str(row[i])]));
      const visual=tab.title==='Inspiration Board', code=tab.title==='🐙 GitHub Deep Dives';
      const title=f['Inspiration / Project']||f.Repo||f['Resource Name'];
      if(!title)return;
      const url=f['Source URL']||f['GitHub URL']||f['Final URL']||f.URL||'';
      records.push({id:`${tab.sheetId}:${slug(title)}:${slug(url)}`,title,url,kind:visual?'precedent':code?'code':'resource',tab:tab.title,row:index+2,
        rowUrl:`https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit#gid=${tab.sheetId}&range=A${index+2}`,
        fields:f,summary:f['Core Concept']||f['Detailed Description']||f['Quick Description'],
        vocabulary:parts(f['Prompt / Visual Keywords']),motion:parts(f['Motion / Interaction Keywords']),
        prompt:f['StarrTree Reconstructed Prompt']||'',promptStatus:visual?'StarrTree reconstructed prompt':'Implementation metadata',
        originalStatus:f['Prompt Availability']||'Not supplied',creator:f['Creator / Studio']||f['Creator / Source']||'',
        framework:f['Stack / Framework']||f['Framework / Stack']||f['Tech / Medium']||'',
        license:f.License||'Not recorded — verify asset rights',verified:f.Verified||f['Last Verified']||'',
        searchText:Object.values(f).join(' ').toLowerCase()});
    });
  }
  if(new Set(records.map(r=>r.id)).size!==records.length)throw Error('Duplicate reference identity; resolve duplicate title/URL pairs in the source.');
  return records;
}
const families=[
  {test:/flow|organic|watery|liquid|alive|fabric|textile|ink/,words:['organic','ink','material','layered','soft','distortion','flow','sheen']},
  {test:/futur|space|orbit|3d|depth/,words:['spatial','orbit','depth','iridescence','geometry']},
  {test:/fashion|textile|cloth|designer/,words:['fashion','editorial','product','sheen','texture','gallery']},
  {test:/tattoo|sketch|floral|portrait/,words:['ink','blueprint','hairline','mask','portrait','editorial']},
  {test:/crazy|crazier|insane/,words:['deformation','choreographed','morph','kinetic']},
  {test:/scroll|cinema|apple/,words:['scroll','pin','scrub','sequence','cinematic']},
  {test:/magazine|editorial|gallery/,words:['editorial','typography','staggered','grid','curated']}
];
export function expandedTerms(query) {
  const raw=query.toLowerCase().match(/[a-z0-9-]{3,}/g)||[];
  const stop=new Set(['the','and','for','with','that','this','make','feel','want','need','something','maybe','where','into','but','not','our','can','from']);
  return [...new Set([...raw.filter(x=>!stop.has(x)),...families.filter(f=>f.test.test(query.toLowerCase())).flatMap(f=>f.words)])];
}
export function search(records,query,kind='all') {
  const terms=expandedTerms(query);
  return records.filter(r=>kind==='all'||r.kind===kind).map(r=>{
    const matched=terms.filter(t=>r.searchText.includes(t));
    const score=matched.reduce((n,t)=>n+(r.title.toLowerCase().includes(t)?5:0)+(r.vocabulary.join(' ').toLowerCase().includes(t)?4:0)+(r.motion.join(' ').toLowerCase().includes(t)?3:0)+1,0);
    return {...r,score,matched};
  }).filter(r=>!terms.length||r.score>0).sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title));
}
export function grammar(selected) {
  return selected.filter(r=>r.kind==='precedent').flatMap(r=>r.vocabulary.map(term=>({term,sourceId:r.id,sourceTitle:r.title,rowUrl:r.rowUrl,provenance:'Motherboard vocabulary'})));
}
export function compatibility(assets, framework='Vanilla / CSS') {
  const all=assets.map(a=>a.searchText).join(' '), names=assets.map(a=>a.title.toLowerCase()).join(' ');
  const r3f=/react three fiber|shadergradient/.test(names), paper=/paper shaders/.test(names);
  const gpu=assets.filter(a=>/webgl|shader|3d|three\.js|react three fiber/.test((a.framework+' '+a.title).toLowerCase()));
  const issues=[];
  if(framework==='React 18'&&r3f)issues.push('Use R3F 8 with React 18; inspect current peerDependencies before installation.');
  if(framework==='React 19'&&r3f)issues.push('Use R3F 9 with React 19; inspect current peerDependencies before installation.');
  if(framework==='Vanilla / CSS'&&r3f)issues.push('Framework conflict: this selection includes a React renderer. Remove it or deliberately choose a React stack.');
  if(framework==='Vanilla / CSS'&&assets.some(a=>/react|next\.js/i.test(a.framework)&&!/vanilla/i.test(a.framework)))issues.push('React/Next component code cannot be dropped into vanilla DOM code. Reimplement the visual principle or choose React.');
  if(gpu.length>1)issues.push('Potential overlapping GPU renderers: do not mount every candidate. Choose one rendering owner per visual region; profile aggregate DPR, textures and draw calls.');
  if(/paper liquid logo/.test(names))issues.push('License review required: Paper Liquid Logo is an application reference with PolyForm Shield restrictions, not the separately licensed Paper Shaders library.');
  if(/liquid glass js/.test(names))issues.push('Experimental: page capture, mobile touch and accessibility require hardening. Prefer CSS for ordinary controls.');
  if(paper)issues.push('Paper Shaders: pin an exact tested release; do not assume an old 0.0.x example matches current props.');
  if(!assets.length)issues.push('No external runtime dependencies selected. Implement layout with semantic HTML, CSS and minimal JavaScript.');
  return {status:issues.some(s=>/conflict|review required/.test(s))?'Needs decision':'Conditional recommendation',issues,
    matrix:[
      ['Framework / versions',framework+'; '+(r3f?'R3F major pairing is explicit; exact package versions remain unverified.':'Check actual package peerDependencies before copying any component.')],
      ['WebGL / dependencies',gpu.length?`${gpu.length} GPU-related candidate(s). Select the minimum subset; a library name does not guarantee interoperability.`:'Zero WebGL required by the base direction.'],
      ['GPU / performance','Proposed budget: one animated focal surface, cap DPR at 1.5, pause offscreen. Profile; no measured score claimed.'],
      ['Mobile viability','Use one-column content, static material artwork and normal touch controls below 768px; test iOS Safari and Android.'],
      ['Accessibility','Semantic DOM copy/CTA, keyboard focus, meaningful alt text, contrast ≥4.5:1 for normal text. Decorative canvas is aria-hidden.'],
      ['Reduced motion','prefers-reduced-motion freezes decorative animation, removes pinning/parallax and preserves every content item.'],
      ['Licensing',assets.length?assets.map(a=>`${a.title}: ${a.license}`).join(' | '):'Use client-owned/licensed media and fonts. No third-party code is required.'],
      ['Difficulty',r3f?'High: scene assets, loaders, GPU profiling and fallbacks.':paper?'Moderate: one shader integration plus semantic layout.':'Low–moderate: responsive composition and CSS interactions.'],
      ['Production readiness','Conditional until real-device, dependency, asset-rights and interaction tests pass. Motherboard notes are dated evidence, not a new verification.']
    ],evidence:assets.map(a=>({title:a.title,url:a.url,rowUrl:a.rowUrl,verified:a.verified,notes:a.fields['Key Risks / Gotchas']||a.fields.Notes||'',readiness:a.fields['Production Readiness']||a.fields['Production Ready']||'Unknown',stack:a.framework,license:a.license}))};
}
const recipes=[
  {id:'editorial',name:'The Editorial Object',subtitle:'Composition carries the ambition',match:/editorial|type|grid|print|hairline|curat|frame|paper|silhouette/,
    layout:'Asymmetric 12-column composition: headline spans 5 columns; a tightly cropped hero image spans 7. Follow with staggered, captioned media and generous negative space.',
    behavior:'Use native scroll. Let one oversized heading remain sticky only while its section has room; reveal images once with 24px translate and 450ms opacity. Keep CTA stationary and readable.',
    material:'Translate the selected material cues into still photography, fine linework and physical texture. Preserve the subject silhouette and avoid animated texture behind body copy.',
    camera:'Fixed editorial framing; deliberate macro crop followed by a full silhouette. No virtual camera navigation.',
    stack:'Semantic HTML + CSS Grid/sticky + minimal IntersectionObserver. No WebGL or animation library required.',budget:'Low GPU · strongest baseline',assetQuery:'CSS sticky editorial grid',accent:'#dccab4'},
  {id:'material',name:'The Living Surface',subtitle:'One tactile, responsive moment',match:/ink|liquid|sheen|contour|irides|soft|organic|material|mask|grain|distort/,
    layout:'One dominant material surface occupies the right two-thirds of the hero. Keep the left text rail quiet; transition to a clean, static gallery below.',
    behavior:'On fine-pointer devices, map normalized pointer position to a localized, damped material response. Limit displacement to 2% of the focal surface; return to neutral after pointer exit. One focal animation only.',
    material:'Let color and sheen follow the subject’s contours instead of sweeping a flat rainbow. Layer restrained grain and soft internal color zones; keep outlines and important detail legible.',
    camera:'Hold the camera still so changes read as material behavior. Use a close crop with soft directional light; avoid moving camera and surface simultaneously.',
    stack:'Keep the editorial DOM. Add one small vanilla or framework-matched shader only if a still treatment cannot express the required response.',budget:'Medium GPU · isolated effect',assetQuery:'shader material texture distortion',accent:'#cfd9b8'},
  {id:'spatial',name:'The Curated Dreamspace',subtitle:'Depth becomes the browsing language',match:/orbit|spatial|depth|3d|camera|artifact|gallery|perspective|float/,
    layout:'Place one central object or silhouette in a spacious exhibition composition. Arrange no more than three supporting image planes with captions around it; keep navigation and conversion outside the scene.',
    behavior:'Use bounded depth: pointer tilt ±4 degrees and layer translation ≤16px. Offer explicit previous/next controls. If true object rotation is essential, use one lazy-loaded scene with constrained orbit, not free-flight.',
    material:'Pair a restrained matte environment with a single highlighted object. Separate layers through occlusion, scale and soft shadow instead of arbitrary glow.',
    camera:'A fixed central focal point with constrained orbit or planar perspective. On touch, replace the scene with a linear gallery preserving the same reading order.',
    stack:'Try CSS perspective first. Only choose React Three Fiber when true 3D geometry/GLB interaction is essential and assets are available.',budget:'Medium–high · asset-dependent',assetQuery:'3D spatial product gallery React Three Fiber',accent:'#d6cae2'}
];
export function directions(selected,brief,records) {
  if(!selected.some(r=>r.kind==='precedent'))throw Error('Select at least one visual precedent in Discover.');
  const terms=grammar(selected);
  return recipes.map(recipe=>{
    const relevant=terms.filter(g=>recipe.match.test(g.term.toLowerCase()));
    return {...recipe,brief:{...brief},sourceIds:selected.map(s=>s.id),grammar:(relevant.length?relevant:terms).slice(0,12),
      adaptation:`Apply this route to “${brief.intent}”. Preserve brand intent: ${brief.brand||'not supplied'}. The conversion goal is ${brief.goal||'not supplied'}.`,
      sourceRoles:selected.map(s=>({id:s.id,title:s.title,role:s.kind==='precedent'?(s.vocabulary.filter(v=>recipe.match.test(v.toLowerCase())).join('; ')||'Supporting reference; translate its composition, without forcing its runtime effect.'):'Implementation constraint evidence'})),
      candidates:search(records.filter(r=>r.kind!=='precedent'),recipe.assetQuery+' '+(relevant.map(t=>t.term).join(' '))).slice(0,5)};
  });
}
export function compile(bundle,selected,direction,assets,brief,framework,notes='') {
  if(!direction)throw Error('Generate and choose a direction first.');
  const ids=new Set(selected.map(s=>s.id));
  if(direction.sourceIds.some(id=>!ids.has(id))||ids.size!==direction.sourceIds.length)throw Error('Context changed. Regenerate directions before compiling.');
  const check=compatibility(assets,framework);
  const packet={schemaVersion:1,type:'starrtree-prompt-packet',generatedAt:new Date().toISOString(),provenance:'StarrTree reconstructed prompt',generationMode:'Local rule-based synthesis; editable; no model call',
    source:{spreadsheetId:bundle.spreadsheetId,url:bundle.sourceUrl,fetchedAt:bundle.fetchedAt,mode:bundle.mode},brief,framework,
    references:selected.map(r=>({id:r.id,title:r.title,source:r.url||null,rowUrl:r.rowUrl,creator:r.creator,summary:r.summary,visualKeywords:r.vocabulary,motionKeywords:r.motion,promptAvailability:r.originalStatus,reconstructedPrompt:r.prompt,verified:r.verified})),
    direction:{id:direction.id,name:direction.name,layout:direction.layout,material:direction.material,camera:direction.camera,interaction:direction.behavior,grammar:direction.grammar,sourceRoles:direction.sourceRoles,stackRecommendation:direction.stack},
    implementationAssets:check.evidence,compatibility:check,notes,
    performance:['Design budget, not measured result: LCP ≤2.5s and CLS ≤0.1 under an agreed mobile test profile.','Hero poster ≤250KB target; defer optional visual JS until after critical content.','At most one animated GPU focal surface; cap DPR at 1.5 and stop animation offscreen.','Under 768px or reduced motion, use the static fallback with the same content and conversion path.'],
    antiPatterns:['Do not introduce unrelated references or claim linked pages were fully inspected.','Do not treat a reconstructed prompt or public summary as a verified original creator prompt.','Do not copy a whole showcase app merely to obtain one effect.','No scroll-jacking, canvas-only text/navigation, autoplay audio or mandatory pointer-only interaction.','No generic card grid, arbitrary glassmorphism or unrelated gradients replacing the chosen composition.','Do not invent testimonials, client results, cultural motifs, brand assets or exact package versions.'],
    acceptance:['Show the selected source lineage and explain each adapted cue.','Match the chosen composition, material response and camera constraints.','Primary CTA is visible before animation loads and works with keyboard/touch.','At 390px and 1440px, no horizontal overflow, clipped copy or inaccessible controls.','Reduced-motion and WebGL-unavailable paths retain all content.','Record dependency versions, license/asset permissions, performance measurements and real-device results before declaring production-ready.']};
  return {packet,markdown:markdown(packet)};
}
export function markdown(p){
  const bullets=a=>a.map(s=>'- '+s).join('\n');
  return `# StarrTree · ${p.direction.name}\n\n**StarrTree reconstructed prompt — not original creator wording.**\n${p.generationMode}\n\n## Business and brand\n- Original intent: ${p.brief.intent}\n- Business goal: ${p.brief.goal||'Not supplied — confirm before client production'}\n- Audience: ${p.brief.audience||'Not supplied — confirm'}\n- Brand intent: ${p.brief.brand||'Not supplied — confirm'}\n- Constraints: ${p.brief.constraints||'No additional constraints supplied'}\n- Target framework: ${p.framework}\n\n## Source context\nMotherboard: ${p.source.url}\nRead: ${p.source.fetchedAt}; mode: ${p.source.mode}. Metadata is dated; verify packages before installation.\n\n${p.references.map((r,i)=>`### ${i+1}. ${r.title}\n- Creator: ${r.creator||'Not recorded'}\n- Source: ${r.source||'No public source URL recorded'}\n- Motherboard row: ${r.rowUrl}\n- Summary: ${r.summary}\n- Visual vocabulary: ${r.visualKeywords.join('; ')}\n- Mechanics: ${r.motionKeywords.join('; ')}\n- Original prompt status: ${r.promptAvailability}\n- StarrTree reconstruction: ${r.reconstructedPrompt||'None'}\n- Motherboard verification date: ${r.verified||'Unknown'}`).join('\n\n')}\n\n## Selected visual grammar\n${bullets(p.direction.grammar.map(g=>`${g.term} — ${g.sourceTitle} (${g.rowUrl})`))}\n\n## Art direction\nComposition: ${p.direction.layout}\n\nMaterial / color / lighting: ${p.direction.material}\n\nCamera / spatial relationships: ${p.direction.camera}\n\nTypography: use a legible body family with a contrasting display face; establish a 3-step type scale. Derive specific font choices from the brand and verify licensing.\n\nInteraction mechanics: ${p.direction.interaction}\n\n## Source roles\n${bullets(p.direction.sourceRoles.map(s=>`${s.title}: ${s.role}`))}\n\n## Smallest effective stack\n${p.direction.stackRecommendation}\n\n## Exact implementation candidates selected\n${p.implementationAssets.length?p.implementationAssets.map(a=>`- ${a.title}: ${a.url}\n  Stack: ${a.stack}\n  License recorded: ${a.license}\n  Risks: ${a.notes}\n  Last recorded verification: ${a.verified||'Unknown'}\n  Source row: ${a.rowUrl}`).join('\n'):'No external dependency selected. Implement the visual principle with native HTML/CSS/JavaScript. Do not install all suggested resources.'}\n\n## Compatibility review\n${bullets(p.compatibility.matrix.map(([k,v])=>`${k}: ${v}`))}\n${bullets(p.compatibility.issues)}\n\n## Mobile / performance requirements\n${bullets(p.performance)}\n\n## Accessibility\nSemantic HTML remains outside decorative canvases; retain native focus and text selection. Keyboard-operable controls, alt text, normal-text contrast ≥4.5:1, visible focus, 44px touch targets. Reduced motion disables decorative animation/pinning without hiding content.\n\n## Do not do\n${bullets(p.antiPatterns)}\n\n## Acceptance criteria\n${bullets(p.acceptance)}\n\n## Art-director adjustments\n${p.notes||'None supplied.'}\n\n## Build sequence\n1. Confirm brand assets and rights; inspect exact selected source implementations and package manifests.\n2. Build static composition and working CTA first.\n3. Add the single signature interaction and its fallback.\n4. Test desktop, mobile, keyboard, reduced motion and unavailable WebGL.\n5. Record actual results as a candidate Proven Pattern; do not call it proven before human review.\n`;
}
export function patternDraft(packet){return {schemaVersion:1,type:'starrtree-pattern-candidate',status:'Unverified candidate — not a Proven Pattern',project:packet.brief.goal,screenshotOrPreview:'',originalReferences:packet.references,finalSuccessfulPrompt:'',draftPrompt:markdown(packet),actualTechnologyStack:[],repository:'',commit:'',desktopResults:'',mobileResults:'',performanceNotes:'',implementationProblems:'',whatWorked:'',reusableVariables:{},humanApproval:false,canonicalDestination:'Motherboard; review and append only after implementation evidence and explicit approval. This file is a handoff, not another resource database.'};}
