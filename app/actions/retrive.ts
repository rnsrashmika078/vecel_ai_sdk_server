import { chromaClient } from "@/app/libs/chromaClient";
import { embeddings } from "@/app/libs/embeddingsHF";

const collection = chromaClient.getOrCreateCollection({
  name: "test",
});

export async function retriveEmbeddings({ input }: { input: string }) {
  try {
    if (!input) return "no result provider";

    const vector = await embeddings.embedQuery(input);

    const results = await (
      await collection
    ).query({
      queryEmbeddings: [vector],
      nResults: 5,
    });

    return results.metadatas[0][0]?.chunk;
  } catch (err) {
    // console.error(err);
    return err;
  }
}
