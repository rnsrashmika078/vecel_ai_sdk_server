import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, system, isFirst, history } = await req.json();

    let title = null;
    let reply = null;

    if (isFirst) {
      const titleRes = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content: `reply 2-3 word short title to the user message as chat title, example: greeting`,
              },
              { role: "user", content: prompt },
            ],
            temperature: 0.7,
          }),
        }
      );
      const titleData = await titleRes.json();
      title = titleData.choices?.[0]?.message?.content ?? "No response";
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `${system}, Chat History: ${JSON.stringify(history)}`,
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    reply = data.choices?.[0]?.message?.content ?? "No response";

    return NextResponse.json({
      message: "Request Succeed!",
      success: true,
      reply,
      title,
    });
  } catch (e) {
    return NextResponse.json({
      message: `failed ${e instanceof Error ? e.message : ""}`,
      success: false,
      reply: null,
      title: null,
    });
  }
}
