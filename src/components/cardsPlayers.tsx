import Image from "next/image"
import Link from "next/link"

interface PlayerCardProps {
  name: string
  countryImageUrl: string
  imageUrl: string
}

export default function PlayerCard({
  name,
  countryImageUrl,
  imageUrl,
}: PlayerCardProps) {
  return (
    <Link href={`/player/${name}`} className="w-fit max-w-md hover:bg-zinc-800 transition-all duration-200 cursor-pointer bg-zinc-900 text-zinc-100 border border-zinc-700 rounded-lg shadow-md">
      <div className="px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
            <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <div className="flex relative items-center h-6 w-8 rounded-md overflow-hidden">
              <Image src={countryImageUrl} alt='countryflag' fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
