import React from "react";

import SearchResult from "@/components/search-result";

export default function SearchResults({ results }) {
  return (
    <div>
      {results.map((result, id) => {
        return <SearchResult result={result} key={id} />;
      })}
    </div>
  );
}
