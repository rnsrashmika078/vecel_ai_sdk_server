import { chromaClient } from "../utils/chromaClient";
import { embeddings } from "../utils/embeddingsHF";

const collection = chromaClient.getOrCreateCollection({
  name: "test",
});

export async function retriveEmbeddings({
  input,
  url,
}: {
  input: string;
  url: string;
}) {
  try {
    if (!input) return "no result provider";
    let result = null;
    while (!result) {
      const vector = await embeddings.embedQuery(input);

      const results = await (
        await collection
      ).query({
        queryEmbeddings: [vector],
        nResults: 5,
        where: { source: url },
      });

      result = results.documents[0][0];
    }

    console.log(`result: ${result}`);
    // console.log(`inpur: ${input}`);
    return result;
  } catch (err) {
    // console.error(err);
    return err;
  }
}
