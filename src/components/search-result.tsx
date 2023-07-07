import React from "react";

export default function SearchResult({ result }) {
  const handleClick = (e) => {
    return alert(result.name);
  };

  return (
    <div className="cursor-pointer hover:bg-slate-200" onClick={handleClick}>
      {result.name}
    </div>
  );
}
