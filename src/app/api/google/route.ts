import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const { query } = json;

        const base_url = "https://www.googleapis.com/customsearch/v1";
        const apiKey = 'AIzaSyDVvPDaKu2rgbIKblRHtMce4SIZ7YXQZ9k';
        const cx = '358882861304c4224';
        
        const params = new URLSearchParams({
          key: apiKey,
          cx: cx,
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
        console.error('Error fetching DuckDuckGo data:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}