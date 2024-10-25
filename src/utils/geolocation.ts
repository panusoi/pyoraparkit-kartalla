export function geolocationPositionErrorToStatus(error: GeolocationPositionError) {
  try {
    switch (error.code) {
      case undefined: {
        return 'error';
      }

      case error.PERMISSION_DENIED: {
        return 'blocked';
      }
      case error.POSITION_UNAVAILABLE: {
        return 'unavailable';
      }
      case error.TIMEOUT: {
        return 'timeout';
      }
      default:
        return 'error';
    }
  } catch {
    return 'error';
  }
}
