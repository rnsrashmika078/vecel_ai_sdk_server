import { DataAPIClient } from "@datastax/astra-db-ts";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
// Initialize the clientimport { HuggingFaceInferenceEmbeddings } from "@langchain/hf";
// npm install @langchain/hf

const {
  ASTRA_DB_TOKEN,
  ASTRA_DB_ENDPOINT,
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  HUGGINGFACEHUB_API_KEY,
} = process.env;
const client = new DataAPIClient(ASTRA_DB_TOKEN!);

const db = client.db(ASTRA_DB_ENDPOINT!, {
  keyspace: ASTRA_DB_NAMESPACE!,
});

(async () => {
  const colls = await db.listCollections();
  console.log("Connected to AstraDB:", colls);
})();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 512,
  chunkOverlap: 100,
});
const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: HUGGINGFACEHUB_API_KEY!,
  model: "sentence-transformers/all-MiniLM-L6-v2",
  provider: "auto",
});
type SimilarityMetric = "dot_product" | "cosine" | "euclidean";
// const createCollection = async (
//   similarityMetric: SimilarityMetric = "dot_product"
// ) => {
//   const res = await db.createCollection(ASTRA_DB_COLLECTION!, {
//     vector: {
//       dimension: 384,
//       metric: similarityMetric,
//     },
//   });
//   console.log(res);
// };

// const data: string[] = [
//   "https://en.wikipedia.org/wiki/2026_Men%27s_T20_World_Cup",
// ];
// const loadSampleData = async () => {
//   await db.collection(ASTRA_DB_COLLECTION!);
//   for await (const url of data) {
//     const content = await scrapePage(url);
//     const chunks = await splitter.splitText(content);
//     for await (const chunk of chunks) {
//       const embed = await embeddings.embedQuery(chunk);
//     }

//     const vector;
//   }
// };
