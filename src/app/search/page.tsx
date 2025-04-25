"use client";

import { getChatCompletion } from "@/actions/getPerplexityResonse";
import ChatComponent from "@/components/chatComponent";
import SearchComponent from "@/components/searchComponent";
import { Message } from "@/types";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, Suspense, useState } from "react";

export default function SearchPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleMessages = (message: Message) =>
    setMessages((prev) => [...prev, message]);

  const handleSubmit = async () => {
    try {
      if (!input.trim()) return;

      const userMessage: Message = { content: input, isUser: true };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      const res = await getChatCompletion(userMessage.content);

      if (res.error.isError) {
        handleMessages({
          isUser: false,
          content:
            res.error.message ||
            "Estamos enfrentando problemas e não conseguimos encontrar uma resposta para a sua pergunta, tente novamente mais tarde.",
        });
      } else {
        if (res.data) {
          const markdown = res.data?.choices[0].message.content;
          handleMessages({
            isUser: false,
            content: markdown,
          });
          
        } else {
          handleMessages({
            isUser: false,
            content:
              res.error.message ||
              "Estamos enfrentando problemas e não conseguimos encontrar uma resposta para a sua pergunta, tente novamente mais tarde.",
          });
        }
      }
    } catch (error: any) {
      console.log(error);
      handleMessages({
        isUser: false,
        content:
          "Estamos enfrentando problemas e não conseguimos encontrar uma resposta para a sua pergunta, tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const onClick = () => router.push("/");

  return (
    <main className="h-screen p-2">
      <button
        onClick={onClick}
        className="bg-neutral-800 p-1 mb-2 rounded-lg hover:bg-neutral-700 transition-all duration-200"
      >
        <ChevronLeft size={16} />
      </button>
      <div className="border h-[95%] flex flex-col border-neutral-700 rounded-xl bg-neutral-900">
        <Suspense>
          <ChatComponent
            setMessages={handleMessages}
            messages={messages}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Suspense>

        <div className="w-full py-2">
          <SearchComponent
            isLoading={isLoading}
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
