import PlayerCard from "@/components/cardsPlayers";
import SearchComponent from "@/components/searchComponent";
import { players } from "@/constants";

export default function Home() {
  return (
    <main className="h-screen p-2">
      <div className="border h-full flex flex-col justify-center items-center border-neutral-700 rounded-xl bg-neutral-900">
        <p className="text-4xl tracking-wide">
          O que você quer saber sobre o nosso TIME ?
        </p>
        <SearchComponent />
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
