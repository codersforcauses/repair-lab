import { useState } from "react";

import SearchBar from "@/components/search-bar";
import SearchResults from "@/components/search-results";

export default function Search() {
  const [results, setResults] = useState([]);

  return (
    <div>
      <SearchBar setResults={setResults} />
      <SearchResults results={results} />
    </div>
  );
}
