import { useQuery } from "@tanstack/react-query";

const networkRequests = async (location: string | undefined) => {
  if (!location) throw new Error("No location found");
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?bbox=115.55631634200273%2C-32.61220956735497%2C116.19239499442205%2C-31.465022270156872&proximity=115.86,-31.95&access_token=${process
      .env.NEXT_PUBLIC_MAPBOX_TOKEN!}`
  );
  const results = await response.json();
  return {
    long: results.features[0].geometry.coordinates[0] as number,
    lat: results.features[0].geometry.coordinates[1] as number
  };
};

export const useGetLocationCoordinates = (location: string | undefined) => {
  return useQuery({
    queryKey: ["coords", location],
    queryFn: () => networkRequests(location),
    enabled: !!location
  });
};
