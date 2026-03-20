"use server";
import { NextRequest, NextResponse } from "next/server";
import { splitter } from "@/app/libs/splitter";

import { embeddings } from "@/app/libs/embeddingsHF";
import { chromaClient } from "@/app/libs/chromaClient";
import { readPDF } from "@/app/helpers/file_operation";
import crypto from "crypto";

const collection = chromaClient.getOrCreateCollection({
  name: "test",
});

export async function storeEmbeddings({ url }: { url: string }) {
  try {
    if (!url) return;

    console.log("URL ", url);
    const data = await readPDF(url);

    if (!data)
      return NextResponse.json({ success: false, error: "No text provided" });

    const hash = crypto.createHash("sha256").update(data).digest("hex");

    const existing = await (
      await collection
    ).get({
      where: { hash },
      limit: 1,
    });

    console.log("Existing Length ", existing.ids[0]?.length);
    console.log("Existing Length ", existing.ids.length);
    if (existing.ids.length == 0) {
      const chunks = await splitter.splitText(data);
      const storedIds: string[] = [];

      for await (const chunk of chunks) {
        const vector = await embeddings.embedQuery(chunk);
        const id = crypto.randomUUID();

        await (
          await collection
        ).add({
          ids: [id],
          metadatas: [{ chunk }],
          embeddings: [vector],
        });
        storedIds.push(id);
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: (err as Error).message });
  }
}
