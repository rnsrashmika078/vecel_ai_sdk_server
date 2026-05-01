import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 256,
  chunkOverlap: 20,
});