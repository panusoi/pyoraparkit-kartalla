export type LatLng = {
  lat: number;
  lng: number;
};

export type CurrentLocation =
  | { status: 'pending' | 'blocked' | 'unsupported' }
  | ({ status: 'current'; timestamp: number } & LatLng);
