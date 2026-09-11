import test from 'node:test';
import assert from 'node:assert/strict';
import {csv,entries,search} from '../lib/screening.ts';
test('CSV preserves quoted commas, escapes and official EOF marker',()=>assert.deepEqual(csv('1,"A, ""B""",C\r\n\x1a'),[['1','A, "B"','C']]));
test('alias names match without inferring identity',()=>{
 const list=entries('1,"BANCO DEMO",-0-,X,-0-,-0-,-0-,-0-,-0-,-0-,-0-,"Excerpt"','1,2,aka,"DEMO BANK",-0-');
 assert.equal(search(list,'bank demo')[0].id,'1');
 assert.equal(search(list,'banking').length,0);
});
test('fallback accepts fresh feed and rejects stale or failed feed',async()=>{
 const original=globalThis.fetch;
 const entry={id:'1',name:'DEMO BANK',kind:'Business',program:'Demo',remarks:'Demo',aliases:[]};
 try{
  for(const age of [1000,86400001]){
   globalThis.fetch=async url=>{if(!String(url).includes('raw.githubusercontent.com'))throw Error('Download unavailable');return Response.json({format:'ofac-sdn-feed-v1',retrievedAt:new Date(Date.now()-age).toISOString(),entries:[entry]})};
   const module=await import('../lib/screening.ts?age='+age);
   if(age<86400000)assert.equal((await module.currentList()).data[0].id,'1');
   else await assert.rejects(module.currentList(),/older than 24 hours/);
  }
 }finally{globalThis.fetch=original}
});
