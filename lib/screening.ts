export const sourceBase='https://sanctionslistservice.ofac.treas.gov/api/PublicationPreview/exports/';
export const scope='OFAC SDN primary names and aliases only. All query words must appear in a name, ignoring punctuation, accents and word order. No fuzzy spelling, ownership, non-SDN, export-control or other-country screening. No results does not mean cleared.';
export type Entry={id:string;name:string;kind:string;program:string;remarks:string;aliases:string[]};
export function csv(text:string){text=text.replace(/\x1a\s*$/,'');const rows:string[][]=[];let row:string[]=[],cell='',quoted=false;for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){cell+='"';i++}else quoted=!quoted}else if(c===','&&!quoted){row.push(cell.trim());cell=''}else if(c==='\n'&&!quoted){row.push(cell.trim());if(row.some(Boolean))rows.push(row);row=[];cell=''}else cell+=c}if(quoted)throw Error('Invalid source CSV');if(cell||row.length){row.push(cell.trim());rows.push(row)}return rows}
const clean=(s:string)=>s==='-0-'?'Not supplied':s;
export function entries(sdn:string,alt:string){const map=new Map<string,Entry>();for(const r of csv(sdn)){if(r.length!==12||!/^\d+$/.test(r[0])||!r[1])throw Error('Unexpected SDN format');map.set(r[0],{id:r[0],name:r[1],kind:clean(r[2]),program:clean(r[3]),remarks:clean(r[11]),aliases:[]})}for(const r of csv(alt)){if(r.length!==5||!/^\d+$/.test(r[0]))throw Error('Unexpected alias format');map.get(r[0])?.aliases.push(r[3])}if(!map.size)throw Error('Empty source list');return [...map.values()]}
export function normalize(s:string){return s.normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim()}
export function search(list:Entry[],query:string){const words=normalize(query).split(' ').filter(Boolean);if(!words.length)throw Error('Enter a name');return list.flatMap(e=>{const matched=[e.name,...e.aliases].find(n=>words.every(w=>normalize(n).split(' ').includes(w)));return matched?[{...e,matched}]:[]})}
export const feedUrl='https://raw.githubusercontent.com/brandoncandela/sanctions-review-desk/main/data/ofac-sdn.json';
let cache:{at:number;data:Entry[];delivery:string}|undefined;
let pending:Promise<NonNullable<typeof cache>>|undefined;
export async function currentList(){
 if(cache&&Date.now()-cache.at<300000)return cache;
 if(pending)return pending;
 pending=(async()=>{
  try{
   const texts=await Promise.all(['SDN.CSV','ALT.CSV'].map(async file=>{
    const r=await fetch(sourceBase+file,{signal:AbortSignal.timeout(8000)});
    if(!r.ok)throw Error('OFAC unavailable');
    const t=await r.text();if(t.length>15000000)throw Error('Source too large');return t;
   }));
   return {at:Date.now(),data:entries(texts[0],texts[1]),delivery:'Direct OFAC download'};
  }catch{
   const r=await fetch(feedUrl,{signal:AbortSignal.timeout(15000)});
   if(!r.ok)throw Error('Feed unavailable');
   const text=await r.text();if(text.length>20000000)throw Error('Feed too large');
   const f=JSON.parse(text);const at=Date.parse(f.retrievedAt);
   if(f.format!=='ofac-sdn-feed-v1'||!Number.isFinite(at)||at>Date.now()+60000||Date.now()-at>86400000||!Array.isArray(f.entries)||!f.entries.length)throw Error('Feed unavailable or older than 24 hours');
   for(const e of f.entries)if(!e||!/^\d+$/.test(e.id)||['name','kind','program','remarks'].some(k=>typeof e[k]!=='string')||!Array.isArray(e.aliases)||e.aliases.some((a:unknown)=>typeof a!=='string'))throw Error('Invalid feed');
   return {at,data:f.entries as Entry[],delivery:'Repository copy of official OFAC downloads; refreshed hourly, maximum age 24 hours'};
  }
 })();try{cache=await pending;return cache}finally{pending=undefined}
}
