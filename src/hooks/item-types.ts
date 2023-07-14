import { useEffect, useState } from "react";

interface ItemType {
  name: string;
}

export function useItemTypes() {
  const [itemTypes, setItemTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/item-type`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data: ItemType[] = await response.json();
      const itemTypeNames = data.map(({ name }) => name);

      setItemTypes(itemTypeNames);
    };

    fetchData();
  }, []);

  return itemTypes;
}
