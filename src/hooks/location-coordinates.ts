import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const networkRequests = async (location: string | undefined) => {
  if (!location) return undefined;
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?bbox=115.55631634200273%2C-32.61220956735497%2C116.19239499442205%2C-31.465022270156872&proximity=115.86,-31.95&access_token=${process
        .env.NEXT_PUBLIC_MAPBOX_TOKEN!}`
    );
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const useGetLocationCoordinates = async (
  location: string | undefined
) => {
  const [coordinates, setCoordinates] = useState<
    { long: string; lat: string } | undefined
  >(undefined);
  useEffect(() => {
    networkRequests(location).then((results) => {
      if (results) {
        setCoordinates({
          long: results.features[0].geometry.coordinates[0],
          lat: results.features[0].geometry.coordinates[1]
        });
      }
    });
  }, [location]);

  return coordinates;
};
