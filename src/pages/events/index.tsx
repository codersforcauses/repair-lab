import { useState } from "react";

import Card from "@/components/Cards/event-card";
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

  return (
    <div className="mt-4 mx-4">
      <div className="grid gap-4 relative grid-cols-4 ">
        <Card props={{ title: "sdjkgnds" }} />
        <Card props={{ title: "sdjkgnds" }} />
        <Card props={{ title: "sdjkgnds" }} />
        <Card props={{ title: "sdjkgnds" }} />
        <Card props={{ title: "sdjkgnds" }} />
        <Card props={{ title: "sdjkgnds" }} />
      </div>
    </div>
  );
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
