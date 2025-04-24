'use client';

import PlayerCard from "@/components/cardsPlayers";
import SearchComponent from "@/components/searchComponent";
import { players } from "@/constants";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [ text, setText ] = useState<string>("");
  const router = useRouter();

  const toggleText = (e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value);

  const onClick = () => router.push(`/search?search=${text}`);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <main className="h-screen p-2">
      <div className="border h-full flex flex-col justify-center items-center border-neutral-700 rounded-xl bg-neutral-900">
        <p className="text-4xl tracking-wide">
          O que você quer saber sobre o nosso TIME ?
        </p>
        <SearchComponent rows onchange={toggleText} onClick={onClick} onKeyDown={handleKeyDown}/>
        <div className="mt-4 w-[45%]">
          <p className="text-xs text-neutral-500">Máximo de caracteres: 512</p>
        </div>
        <div className="flex flex-wrap max-w-[45%] gap-4 mt-6">
        {players.map(({ countryImageUrl, imageUrl, name }, index) => (
          <PlayerCard
            key={index}
            imageUrl={imageUrl}
            countryImageUrl={countryImageUrl}
            name={name}
          />
        ))}
        </div>
      </div>
    </main>
  );
}
