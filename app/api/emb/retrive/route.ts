import { NextRequest, NextResponse } from "next/server";
import { chromaClient } from "@/app/libs/chromaClient";
import { splitter } from "@/app/libs/splitter";
import { embeddings } from "@/app/libs/embeddingsHF";

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

    // Insert each chunk with its embeddings
    for await (const chunk of chunks) {
      const vector = await embeddings.embedQuery(chunk); // your embedding
      const id = crypto.randomUUID();

      await (await collection).add({
        ids: [id],
        documents: [chunk],
        embeddings: [vector], // provide embedding directly
      });

      storedIds.push(id);
    }

    // Query the collection
    const results = await (await collection).query({
      queryTexts: [text],
      nResults: 2,
      include: ["documents", "distances"], // optional fields
    });

    console.log(results);

    return NextResponse.json({ success: true, results });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: (err as Error).message });
  }
}