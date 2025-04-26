import getChatCompletion from "@/actions/openAi";
import { messagePromptError } from "@/constants";
import { Message } from "@/types";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  setIsLoading,
}: ChatComponentProps) {
  const params = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchValue = params.get("search");
    if (searchValue) {
      const query = decodeURIComponent(searchValue);
      setMessages({ content: query, isUser: true });

      setIsLoading(true);
      getChatCompletion([...messages, { content: query, isUser: true }])
        .then((res) => {
          if (res.error.isError) {
            setMessages({
              isUser: false,
              content:
                res.error.message ||
                messagePromptError,
            });
          } else {
            if (res.data) {
              setMessages({
                isUser: false,
                content: res.data,
              });
            } else {
              setMessages({
                isUser: false,
                content:
                  res.error.message ||
                  messagePromptError,
              });
            }
          }
        })
        .catch((err) =>
          setMessages({
            isUser: false,
            content:
              err.message ||
              messagePromptError
          })
        )
        .finally(() => setIsLoading(false));
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
          className={`mb-4 py-3 px-6 w-fit max-w-1/2 text-sm md:text-base break-words whitespace-normal overflow-x-hidden leading-8 ${
            message.isUser
              ? "ml-auto bg-zinc-800 text-white rounded-full"
              : "text-white"
          }`}
        >
          <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
        </div>
      ))}
      {isLoading && (
        <div className="text-neutral-700 px-6 rounded-lg w-fit max-w-[80%] break-words whitespace-normal overflow-x-hidden animate-pulse">
          Pensando...
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatComponent;
