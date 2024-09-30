export type CurrentLocation =
  | { status: 'pending' | 'blocked' | 'unsupported' }
  | { status: 'current'; lng: number; lat: number; timestamp: number };
