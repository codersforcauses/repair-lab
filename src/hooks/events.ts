import { useEffect, useState } from "react";

interface EventOption {
  id: string;
  name: string;
}

export function useEventOptions() {
  const [events, setEvents] = useState([] as EventOption[]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/event/options`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching brands: ${response.status}`);
      }
      const events: EventOption[] = await response.json();
      setEvents(events);
    };
    fetchData();
  }, []);

  return events;
}
