import { useEffect, useState } from "react";

interface Brand {
  name: string;
}

export function useBrands() {
  const [brands, setBrands] = useState([] as string[]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/brand`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching brands: ${response.status}`);
      }
      const brands: Brand[] = await response.json();
      const brandNames = brands.map(({ name }) => name);
      setBrands(brandNames);
    };
    fetchData();
  }, []);
  return brands;
}
