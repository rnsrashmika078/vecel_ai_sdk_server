"use server";
import { NextRequest, NextResponse } from "next/server";

import { readPDF } from "@/app/helpers/file_operation";
import crypto from "crypto";
import { chromaClient } from "../utils/chromaClient";
import { splitter } from "../utils/splitter";
import { embeddings } from "../utils/embeddingsHF";

const collection = chromaClient.getOrCreateCollection({
  name: "test",
});

export async function storeEmbeddings({ url }: { url: string }) {
  try {
    if (!url) return;
    const existing = await (
      await collection
    ).get({
      where: { source: url },
    });

    if (existing.ids.length > 0)
      return NextResponse.json({ success: true, error: "Embedding Exist" });

    const data = await readPDF(url);
    console.log(`data : ${data}`);

    if (!data)
      return NextResponse.json({ success: false, error: "No text provided" });

    const chunks = await splitter.splitText(data);
    const vectors = await embeddings.embedDocuments(chunks);
    const ids = chunks.map(() => crypto.randomUUID());
    await (
      await collection
    ).add({
      ids,
      documents: chunks,
      embeddings: vectors,
      metadatas: chunks.map((chunk) => ({
        chunk,
        source: url,
      })),
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: (err as Error).message });
  }
}
