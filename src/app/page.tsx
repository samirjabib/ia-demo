"use client";

import { SystemMessage } from "@/components/chat/SystemMessage";
import { UserMessage } from "@/components/chat/UserMessage";
import { CreateFood } from "@/components/foods/CreateFood";
import { SearchFood } from "@/components/foods/SearchFood";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActions, useUIState } from "ai/rsc";
import { type FormEvent, useState } from "react";
import { AI } from "./actions";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useUIState<typeof AI>();
  const { continueConversation } = useActions<typeof AI>();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("submit");
  };

  return (
    <main className="flex min-h-screen flex-col justify-end bg-neutral-800">
      <div className="container flex grow flex-col  gap-6">
        <CreateFood />
        <SearchFood />
        <SystemMessage message="Hello, how can I help you?" />
        <UserMessage message="What can you do for me?" />
      </div>
      <form
        className="flex items-center justify-center gap-4 bg-neutral-900 p-8"
        onSubmit={submit}
      >
        <Input
          className="w-3/4"
          placeholder="enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </form>
    </main>
  );
}
