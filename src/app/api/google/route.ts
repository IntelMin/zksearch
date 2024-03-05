import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const { query } = json;

        const base_url = "https://www.googleapis.com/customsearch/v1";

        const params = new URLSearchParams({
          key: process.env.GOOGLE_API_KEY || '',
          cx: process.env.GOOGLE_API_CX || '',
          q: query,
        });
        
        const url = `${base_url}?${params.toString()}`;
            
        const googleResponse = await fetch(url);
        if (!googleResponse.ok) {
          throw new Error(`Error: ${googleResponse.status}\n${googleResponse.statusText}`);
        }
        
        const results = await googleResponse.json();
        
        return NextResponse.json(
            { status: 200, headers: { 'Content-Type': 'application/json' }, data: results }
        );
    } catch (error) {
        console.error('Error fetching Google data:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}