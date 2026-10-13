import {cpSync,mkdirSync,rmSync} from 'node:fs';
rmSync('public',{recursive:true,force:true});
mkdirSync('public');
cpSync('web','public',{recursive:true});
console.log('Built phone-ready static interface. Source data remains server-only.');
