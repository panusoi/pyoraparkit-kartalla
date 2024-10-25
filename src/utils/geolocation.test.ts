import { describe, it, expect } from 'vitest';

import { geolocationPositionErrorToStatus } from './geolocation';

describe('geolocation utils', () => {
  describe('geolocationPositionErrorToStatus', () => {
    const getError = (code: number): GeolocationPositionError => {
      return {
        code,
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
        message: 'Error',
      };
    };

    it('PERMISSION_DENIED', () => {
      expect(geolocationPositionErrorToStatus(getError(1))).toMatchInlineSnapshot(`"blocked"`);
    });

    it('POSITION_UNAVAILABLE', () => {
      expect(geolocationPositionErrorToStatus(getError(2))).toMatchInlineSnapshot(`"unavailable"`);
    });

    it('TIMEOUT', () => {
      expect(geolocationPositionErrorToStatus(getError(3))).toMatchInlineSnapshot(`"timeout"`);
    });

    it('unknown error code', () => {
      expect(geolocationPositionErrorToStatus(getError(4))).toMatchInlineSnapshot(`"error"`);
    });

    it('null', () => {
      expect(geolocationPositionErrorToStatus(null as never)).toMatchInlineSnapshot(`"error"`);
    });

    it('empty object', () => {
      expect(geolocationPositionErrorToStatus({} as never)).toMatchInlineSnapshot(`"error"`);
    });

    it('string', () => {
      expect(geolocationPositionErrorToStatus('Error' as never)).toMatchInlineSnapshot(`"error"`);
    });
  });
});
