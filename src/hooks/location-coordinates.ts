export const GetLocationCoordinates = async (location: string | undefined) => {
  const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?bbox=115.55631634200273%2C-32.61220956735497%2C116.19239499442205%2C-31.465022270156872&proximity=115.86,-31.95&access_token=${process
    .env.NEXT_PUBLIC_MAPBOX_TOKEN!}`;
  const response = await fetch(endpoint);
  const results = await response.json();

  const long = results.features[0].geometry.coordinates[0];
  const lat = results.features[0].geometry.coordinates[1];
  console.log(long);
  console.log(lat);

  return [long, lat];
};
