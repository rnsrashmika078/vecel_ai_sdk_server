import { NextRequest, NextResponse } from "next/server";
import { chromaClient } from "@/app/libs/chromaClient";
import { embeddings } from "@/app/libs/embeddingsHF";

const collection = chromaClient.getOrCreateCollection({
  name: "test",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { input } = body;

    if (!input)
      return NextResponse.json({ success: false, error: "No text provided" });

    const vector = await embeddings.embedQuery(input);

    const results = await (
      await collection
    ).query({
      queryEmbeddings: [vector],
      nResults: 1,
    });


    return NextResponse.json({ success: true, results });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: (err as Error).message });
  }
}
