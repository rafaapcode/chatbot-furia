import { Send } from "lucide-react";

function SearchComponent() {
  return (
    <div className="border border-neutral-700 rounded-2xl mt-10 w-[45%] overflow-hidden">
      <textarea
        name="search"
        id="search"
        className="w-full py-4 pl-2 outline-none focus:outline-none resize-none rounded-2xl"
        rows={4}
        maxLength={510}
      ></textarea>
      <div className="py-2 px-4 flex justify-end">
        <button className="hover:bg-neutral-800 transition-all duration-200 size-10 flex justify-center items-center rounded-lg">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default SearchComponent;
