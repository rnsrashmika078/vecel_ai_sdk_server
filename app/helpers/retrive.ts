import { chromaClient } from "../utils/chromaClient";
import { embeddings } from "../utils/embeddingsHF";

export async function retriveEmbeddings({
  input,
  url,
}: {
  input: string;
  url: string;
}) {
  try {
    if (!input) return "no input provided";

    const vector = await embeddings.embedQuery(input);

    const collection = chromaClient.getCollection({
      name: "test",
    });

    const results = await (
      await collection
    ).query({
      queryEmbeddings: [vector],
      nResults: 5,
      where: { source: url },
    });

    if (!results.documents?.length || !results.documents[0]?.length) {
      return "no results found";
    }

    const result = results.documents.flat();

    // console.log("results:", results);
    // console.log("final result:", result);

    return result;
  } catch (err) {
    console.error(err);
    return "error retrieving embeddings";
  }
}
