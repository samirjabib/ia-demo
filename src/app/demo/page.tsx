import { openaiModel } from "@/server/ai/open-ai";
import { generateText } from "ai";
import { z } from "zod";

export default async function Page() {
  const res = await generateText({
    model: openaiModel,
    prompt: "Hello, what day is it?",
    tools: {
      get_day: {
        description: "get the day of the week",
        parameters: z.object({}),
        execute: async () => {
          const today = new Date();
          const day = today.getDay().toLocaleString();
          return day;
        },
      },
    },
  });

  console.log(res);

  return <div>hello there</div>;
}
