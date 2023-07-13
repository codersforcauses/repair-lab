import { AiOutlineSearch } from "react-icons/ai";

export default function SortBy() {
  return (
    <div className="sd:w-auto relative w-full p-4 text-gray-600">
      <input
        className="sd:w-auto h-10 w-96 rounded-3xl border-none bg-gray-100 px-5 pr-16 text-sm focus:shadow-md focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 mr-10 mt-[1.6rem]"
      >
        <AiOutlineSearch className="-mr-1 h-5 w-5 " />
      </button>
    </div>
  );
}