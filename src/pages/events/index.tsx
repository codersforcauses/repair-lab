import { useState } from "react";

import NavBar from "@/components/NavBar";
import { useEvents } from "@/hooks/events";
import { NextPageWithLayout } from "@/pages/_app";

const Events: NextPageWithLayout = () => {
  const [sortKey, setSortKey] = useState<string>("startDate");
  const [searchWord, setSearchWord] = useState<string>("");
  const [sortMethod, setSortMethod] = useState<string>("asc");
  const [expandedButton, setExpandedButton] = useState<string>("");

  const { data: eventData, isLoading: isEventsLoading } = useEvents(
    sortKey,
    sortMethod,
    searchWord
  );

  return <div>text</div>;
};

Events.getLayout = function getLayout(page) {
  return (
    <>
      <NavBar />
      {page}
    </>
  );
};

export default Events;
