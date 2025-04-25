import { Send } from "lucide-react";
import { ChangeEvent, KeyboardEvent } from "react";

interface SearchComponentProps {
  onchange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClick: () => Promise<void | boolean> | void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  isLoading?: boolean;
  className?: string;
  rows: boolean;
  value?: string;
}

function SearchComponent({
  onClick,
  onchange,
  onKeyDown,
  isLoading,
  className,
  rows,
  value
}: SearchComponentProps) {
  return (
    <div
      className={
        className
          ? className
          : "border border-neutral-700 rounded-2xl mt-10 w-[95%] md:w-[90%] lg:w-[45%] overflow-hidden"
      }
    >
      <textarea
        disabled={isLoading}
        value={value}
        onChange={onchange}
        onKeyDown={onKeyDown}
        name="search"
        id="search"
        className="w-full py-4 pl-4 outline-none focus:outline-none resize-none rounded-2xl placeholder:text-sm md:placeholder:text-base"
        rows={rows ? 4 : undefined}
        maxLength={510}
        placeholder="Pergunte qualquer coisa sobre o time de CS da FURIA !"
      />
      <div className="py-2 px-4 flex justify-end">
        <button
          disabled={isLoading}
          onClick={onClick}
          className="hover:bg-neutral-800 transition-all duration-200 size-10 flex justify-center items-center rounded-lg"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default SearchComponent;
