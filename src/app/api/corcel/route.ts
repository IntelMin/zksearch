import { NextResponse } from 'next/server';
import { DataEntry } from "@/data/corceltypes";

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const { query } = json;

        // Call Corcel API directly within the POST handler
        const corcelResponse = await fetch("https://api.corcel.io/cortext/text", {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: process.env.CORCELAPIKEY || "",
            },
            body: JSON.stringify({
                model: "cortext-lite",
                stream: false,
                miners_to_query: 1,
                top_k_miners_to_query: 40,
                ensure_responses: true,
                messages: [{ role: "user", content: query }],
            }),
        });

        if (!corcelResponse.ok) {
            throw new Error(`Corcel API request failed with status ${corcelResponse.status}`);
        }

        const corcelData: DataEntry[] = await corcelResponse.json();

        return NextResponse.json(
            { status: 200, headers: { 'Content-Type': 'application/json' }, data : corcelData }
        );
    } catch (error) {
        console.error('Error proxying request to Corcel API:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}