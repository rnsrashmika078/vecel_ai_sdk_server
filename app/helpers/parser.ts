import { UIDataTypes, UIMessage, UIMessagePart, UITools } from "ai";

export function inputParser(
  part: UIMessagePart<UIDataTypes, UITools>,
  message: UIMessage<unknown, UIDataTypes, UITools>,
) {
  let parse = null;
  if (part.type === "text" && message.role === "user") {
    try {
      parse = message.role === "user" ? JSON.parse(part.text) : part;
    } catch (e) {
      console.log("parse error", e);
    }
  }

  return parse;
}
