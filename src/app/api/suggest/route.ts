import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const { query } = json;

        console.log('query', query)


        const base_url = 'https://api.bing.com/osjson.aspx'

        const params = new URLSearchParams({
          query: query,
        });
        
        const url = `${base_url}?${params.toString()}`;
            
        const suggestionResponse = await fetch(url);
        if (!suggestionResponse.ok) {
          throw new Error(`Error: ${suggestionResponse.status}\n${suggestionResponse.statusText}`);
        }
        
        const results = await suggestionResponse.json();

        console.log("suggestionResponse", results)
        
        return NextResponse.json(
            { status: 200, headers: { 'Content-Type': 'application/json' }, data: results[1] }
        );
    } catch (error) {
        console.error('Error fetching Suggestion data:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}