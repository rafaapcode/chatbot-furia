"use client";

import SearchComponent from "@/components/searchComponent";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

interface Message {
  content: string;
  isUser: boolean;
}

export default function SearchPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const params = useSearchParams();

  useEffect(() => {
    const searchValue = params.get("search");
    if (searchValue) {
      const query = decodeURIComponent(searchValue);
      setMessages([
        { content: query, isUser: true },
        { content: `Pesquisando sobre: ${query}...`, isUser: false },
      ]);
      // Aqui você adicionaria a chamada à API para responder à consulta
    }
  }, [params]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { content: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulando uma resposta do bot (substitua por chamada API real)
    setTimeout(() => {
      const botResponse: Message = {
        content: `Resposta para: ${input}`,
        isUser: false,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <main className="h-screen p-2">
      <div className="border h-full flex flex-col border-neutral-700 rounded-xl bg-neutral-900">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`mb-4 p-3 rounded-lg w-fit max-w-[80%] overflow-y-auto ${
                message.isUser
                  ? "ml-auto bg-zinc-800 text-white"
                  : "bg-zinc-600 text-white"
              }`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="bg-neutral-800 text-white p-3 rounded-lg w-fit max-w-[80%] animate-pulse">
              Pensando...
            </div>
          )}
        </div>

        <div className="w-full py-2">
          <SearchComponent
            rows={false}
            value={input}
            className="w-[90%] border border-zinc-800 rounded-2xl mx-auto"
            onClick={handleSubmit}
            onchange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </main>
  );
}
