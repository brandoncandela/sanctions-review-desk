import {currentList,search,normalize,scope,sourceBase,type Entry} from './screening';
export type ScreeningResult={delivery:string;query:string;retrievedAt:string;searchedAt:string;sources:string[];total:number;results:(Entry&{matched:string})[]};
// Same checks and response shape as app/api/screening/route.ts, run in the browser so the desk works on static hosting.
export async function screen(query:string):Promise<ScreeningResult>{
 if(query.trim().length<3||query.length>120||normalize(query).length<3)throw Error('Enter a name between 3 and 120 characters.');
 try{const list=await currentList({direct:false}),hits=search(list.data,query);return {query,delivery:list.delivery,retrievedAt:new Date(list.at).toISOString(),searchedAt:new Date().toISOString(),sources:[sourceBase+'SDN.CSV',sourceBase+'ALT.CSV'],total:hits.length,results:hits.slice(0,25)}}
 catch{throw Error('Screening unavailable. No screening conclusion was produced. Try again or use the official OFAC search.')}
}
export {scope};
