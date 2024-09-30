import type { LatLng } from './location';

type ParkingSpotType = 'BIKE_PARKING' | 'CONNECTION_PARKING';

type ParkingSpotStatus = 'IN_USE' | 'NOT_IN_USE';

type ParkingSpotId = `tre:${string}`;

export type ParkingSpot = {
  id: ParkingSpotId;
  area: string;
  type: ParkingSpotType;
  status: ParkingSpotStatus;
  image?: string;
  coordinates: LatLng;
  rack: {
    manufacturer?: string;
    model?: string;
    spots?: number;
    count?: number;
    frameLock?: boolean;
  };
};
