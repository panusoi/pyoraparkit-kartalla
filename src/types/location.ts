export type LatLng = {
  lat: number;
  lng: number;
};

export type CurrentLocation =
  | { status: 'pending' | 'blocked' | 'unsupported' | 'timeout' | 'unavailable' | 'error' }
  | ({ status: 'current'; timestamp: number } & LatLng);
