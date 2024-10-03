export function getDistanceToNow(timestamp: number, now = Date.now()): number {
  return Math.round((now - timestamp) / 1_000);
}
