export function formatDistance(distance: number) {
  if (distance < 1) {
    return '< 1 m';
  }

  if (distance < 1000) {
    return `${distance.toFixed(0)} m`;
  }

  if (distance < 11_000) {
    return `${(distance / 1_000).toFixed(2)} km`;
  }

  return '> 10 km';
}

type LngLat = {
  lng: number;
  lat: number;
};

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function calculateDistance(
  { lng: fromLng, lat: fromLat }: LngLat,
  { lng: toLng, lat: toLat }: LngLat,
): number {
  const R = 6371000; // to get meters
  const dLat = toRadians(toLat - fromLat);
  const dLon = toRadians(toLng - fromLng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(fromLat)) *
      Math.cos(toRadians(toLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
