import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

export const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGINGFACEHUB_API_KEY!,
  model: "sentence-transformers/all-MiniLM-L6-v2",
  provider: "auto",
});
