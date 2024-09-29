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
