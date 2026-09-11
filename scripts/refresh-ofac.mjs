import {entries,sourceBase} from '../lib/screening.ts';
import {writeFile,mkdir} from 'node:fs/promises';
const files=['SDN.CSV','ALT.CSV'];
const texts=await Promise.all(files.map(async file=>{
 const r=await fetch(sourceBase+file,{signal:AbortSignal.timeout(60000)});
 if(!r.ok)throw Error(`Official source returned ${r.status}`);
 const t=await r.text();if(t.length>15000000)throw Error('Source too large');return t;
}));
const data=entries(...texts);
await mkdir('data',{recursive:true});
await writeFile('data/ofac-sdn.json',JSON.stringify({format:'ofac-sdn-feed-v1',retrievedAt:new Date().toISOString(),sources:files.map(f=>sourceBase+f),entries:data}));
console.log(`Refreshed ${data.length} official SDN entries.`);
