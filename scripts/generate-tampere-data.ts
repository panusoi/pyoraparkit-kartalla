import { readFile, writeFile } from 'fs/promises';
import type { ParkingSpot } from '../src/types/parking.types';
import { argv } from 'process';
import path from 'path';
import proj4 from 'proj4';

type RawData = {
  features: {
    geometry: {
      type: string;
      coordinates: number[];
    };
    properties: {
      id: number | string;
      alue: string;
      pysakointipaikan_tyyppi: string;
      telinevalmistaja?: string;
      telinemalli?: string;
      telinemaara?: number;
      paikkamaara?: number;
      runkolukittavuus?: string;
      tila?: string;
      kuva_url?: string;
    };
  }[];
};

const json = await readFile(argv[2]).then((r) => JSON.parse(r.toString('utf-8')) as RawData);

const epsgIndex = await readFile(
  path.join(import.meta.dirname, '..', 'node_modules', 'epsg-index', 'all.json'),
).then((r) => JSON.parse(r.toString('utf-8')));

// ETRS89 / GK24FIN -> WGS 84
const transfromCoordinates = proj4(epsgIndex['3878'].proj4, epsgIndex['4326'].proj4);

const parseRawData = (data: RawData): ParkingSpot[] => {
  const getImage = (value: string | undefined): string | undefined => {
    return value?.match(
      /[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/,
    )?.[0];
  };

  const getCoordinates = ({
    coordinates,
    type,
  }: RawData['features'][number]['geometry']): ParkingSpot['coordinates'] => {
    if (type !== 'Point') {
      throw new Error(`Unknown geometry type: ${type}`);
    }

    const [lng, lat] = transfromCoordinates.forward(coordinates);

    if (lng && lat) {
      return { lng, lat };
    }

    throw new Error(`Unknown geometry coordinates: ${coordinates.join(';')}`);
  };

  const getStatus = (value: string | undefined): ParkingSpot['status'] => {
    if (value === 'käytössä') {
      return 'IN_USE';
    }

    throw new Error(`Unknown status: ${value}`);
  };
  const getType = (value: string): ParkingSpot['type'] => {
    if (value === 'liityntäpysäköintipaikka') {
      return 'CONNECTION_PARKING';
    }

    if (value === 'pyöräpysäköintipaikka') {
      return 'BIKE_PARKING';
    }

    throw new Error(`Unknown type: ${value}`);
  };

  const getFrameLock = (value: string | undefined): boolean | undefined => {
    if (value === 'kyllä') {
      return true;
    }

    if (value === 'ei') {
      return false;
    }

    return undefined;
  };

  return data.features
    .sort((a, b) => Number(a.properties.id) - Number(b.properties.id))
    .map(
      ({
        properties: {
          alue,
          id,
          kuva_url,
          paikkamaara,
          pysakointipaikan_tyyppi,
          runkolukittavuus,
          telinemaara,
          telinemalli,
          telinevalmistaja,
          tila,
        },
        geometry,
      }) => ({
        area: alue,
        id: `tre:${id}`,
        coordinates: getCoordinates(geometry),
        rack: {
          count: telinemaara ?? undefined,
          spots: paikkamaara ?? undefined,
          model: telinemalli ?? undefined,
          manufacturer: telinevalmistaja ?? undefined,
          frameLock: getFrameLock(runkolukittavuus),
        },
        status: getStatus(tila),
        type: getType(pysakointipaikan_tyyppi),
        image: getImage(kuva_url),
      }),
    );
};

const outputTemplate = `
import type { ParkingSpot } from '../types/parking.types';

const tampereParkingSpots: ParkingSpot[] = ${JSON.stringify(parseRawData(json), null, 2) + ';'}

export const tampereParkingSpotsUpdatedAt = '${new Date().toISOString().slice(0, 10)}';
export default tampereParkingSpots;
`;

await writeFile(
  `${path.join(import.meta.dirname, '..', 'src', 'data', 'tampere.ts')}`,
  outputTemplate,
);
