import { Message } from "@/types";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface ChatComponentProps {
  isLoading: boolean;
  messages: Message[];
  setMessages: (messages: Message) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>; 
}

function ChatComponent({
  isLoading,
  messages,
  setMessages,
  setIsLoading
}: ChatComponentProps) {
  const params = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const searchValue = params.get("search");
    if (searchValue) {
      const query = decodeURIComponent(searchValue);
      setMessages({ content: query, isUser: true });

      setIsLoading(true)
      setTimeout(() => {
        setMessages({ content: `Pesquisando sobre: ${query}...`, isUser: false });
        setIsLoading(false);
      }, 5000);
    }
  }, [params]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message, i) => (
        <div
          key={i}
          className={`mb-4 p-3 rounded-lg w-fit max-w-1/2 text-sm md:text-base break-words whitespace-normal overflow-x-hidden ${
            message.isUser
              ? "ml-auto bg-zinc-800 text-white"
              : "bg-zinc-600 text-white"
          }`}
        >
          {message.content}
        </div>
      ))}
      {isLoading && (
        <div className="bg-neutral-800 text-white p-3 rounded-lg w-fit max-w-[80%] break-words whitespace-normal overflow-x-hidden animate-pulse">
          Pensando...
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatComponent;