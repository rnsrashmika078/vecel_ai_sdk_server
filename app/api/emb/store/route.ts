import { NextRequest, NextResponse } from "next/server";
import { splitter } from "@/app/libs/splitter";
import { embeddings } from "@/app/libs/embeddingsHF";
import { chromaClient } from "@/app/libs/chromaClient";

const collection = chromaClient.getOrCreateCollection({
  name: "test",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text)
      return NextResponse.json({ success: false, error: "No text provided" });

    const chunks = await splitter.splitText(text);
    const storedIds: string[] = [];

    for await (const chunk of chunks) {
      const vector = await embeddings.embedQuery(chunk);
      const id = crypto.randomUUID();

      await (await collection).add({
        ids: [id],
        metadatas: [{ chunk }],
        embeddings: [vector],
      });
      storedIds.push(id);
    }

    return NextResponse.json({ success: true, storedIds });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: (err as Error).message });
  }
}
