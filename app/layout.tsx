import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Sanctions Review Desk | Investigation work sample',description:'Fictional sanctions alert cases for individual and business review, evidence requests and QC.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
