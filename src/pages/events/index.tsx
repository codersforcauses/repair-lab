import { useState } from "react";

import { useEvents } from "@/hooks/events";

const Events = () => {
  const [sortKey, setSortKey] = useState<string>("startDate");
  const [searchWord, setSearchWord] = useState<string>("");
  const [sortMethod, setSortMethod] = useState<string>("asc");
  const [expandedButton, setExpandedButton] = useState<string>("");

  const { data: eventData, isLoading: isEventsLoading } = useEvents(
    sortKey,
    sortMethod,
    searchWord
  );
};

export default Events;
