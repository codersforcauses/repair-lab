import React from "react";
import Image from "next/image";

export default function SortBy() {
  return (
    <div className="sd:w-auto text-gray-600 relative w-4/12 p-4">
      <input
        className="sd:w-auto bg-gray-100 h-10 w-full rounded-3xl border-none px-5 pr-16 text-sm focus:shadow-md focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 mr-10 mt-[1.6rem]"
      >
        <Image
          className="fill-current text-gray-600 h-4 w-4"
          src="/images/searchIcon.svg"
          width="50"
          height="50"
          alt="test"
        />
      </button>
    </div>
  );
}
