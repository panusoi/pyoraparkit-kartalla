const LOCATION_MODE_KEY = 'location-refresh';
const LOCATION_HIGH_ACCURACY_KEY = 'location-high-accuracy';

const DEFAULT_LOCATION_MODE = 'auto';
const DEFAULT_LOCATION_HIGH_ACCURACY_KEY = 'false';

export function getLocationMode(): 'auto' | 'manual' {
  const value = localStorage.getItem(LOCATION_MODE_KEY);
  if (value === 'auto' || value === 'manual') {
    return value;
  }
  return DEFAULT_LOCATION_MODE;
}

export function changeLocationMode(mode: string) {
  if (mode === DEFAULT_LOCATION_MODE) {
    localStorage.removeItem(LOCATION_MODE_KEY);
  } else {
    localStorage.setItem(LOCATION_MODE_KEY, mode);
  }
}

export function getLocationHighAccuracy(): boolean {
  return Boolean(
    localStorage.getItem(LOCATION_HIGH_ACCURACY_KEY) ?? DEFAULT_LOCATION_HIGH_ACCURACY_KEY,
  );
}

export function changeLocationHighAccuracy(mode: string) {
  if (mode === DEFAULT_LOCATION_HIGH_ACCURACY_KEY) {
    localStorage.removeItem(LOCATION_HIGH_ACCURACY_KEY);
  } else {
    localStorage.setItem(LOCATION_HIGH_ACCURACY_KEY, mode);
  }
}
