import { describe, it, expect } from 'vitest';

import { calculateDistance, formatDistance } from './distance';

describe('distance utils', () => {
  describe('formatDistance', () => {
    it('less than 1m in text', () => {
      expect(formatDistance(-1)).toMatchInlineSnapshot(`"< 1 m"`);
      expect(formatDistance(0)).toMatchInlineSnapshot(`"< 1 m"`);
      expect(formatDistance(0.15)).toMatchInlineSnapshot(`"< 1 m"`);
      expect(formatDistance(0.99)).toMatchInlineSnapshot(`"< 1 m"`);
    });

    it('greater than or equal to 1m but less than 1km in meters', () => {
      expect(formatDistance(1)).toMatchInlineSnapshot(`"1 m"`);
      expect(formatDistance(10)).toMatchInlineSnapshot(`"10 m"`);
      expect(formatDistance(100)).toMatchInlineSnapshot(`"100 m"`);
      expect(formatDistance(999)).toMatchInlineSnapshot(`"999 m"`);
      expect(formatDistance(100.1245)).toMatchInlineSnapshot(`"100 m"`);
    });

    it('greater than or equal to 1km but less than 11km in meters', () => {
      expect(formatDistance(1_000)).toMatchInlineSnapshot(`"1.00 km"`);
      expect(formatDistance(1_500)).toMatchInlineSnapshot(`"1.50 km"`);
      expect(formatDistance(1_500.125)).toMatchInlineSnapshot(`"1.50 km"`);
      expect(formatDistance(5_000)).toMatchInlineSnapshot(`"5.00 km"`);
      expect(formatDistance(10_500)).toMatchInlineSnapshot(`"10.50 km"`);
    });

    it('greater than or equal to 11km in text', () => {
      expect(formatDistance(11_000)).toMatchInlineSnapshot(`"> 10 km"`);
      expect(formatDistance(100_000)).toMatchInlineSnapshot(`"> 10 km"`);
      expect(formatDistance(100.1245)).toMatchInlineSnapshot(`"100 m"`);
    });
  });

  describe('calculateDistance', () => {
    it('should return distance between to coordinates in meters', () => {
      expect(
        calculateDistance(
          {
            lat: 38.8976,
            lng: -77.0366,
          },
          {
            lat: 39.9496,
            lng: -75.1503,
          },
        ),
      ).toMatchInlineSnapshot(`199830.22873473688`);

      expect(
        calculateDistance(
          {
            lat: 10,
            lng: 10,
          },
          {
            lat: 20,
            lng: 20,
          },
        ),
      ).toMatchInlineSnapshot(`1544757.5610296098`);

      expect(
        calculateDistance(
          {
            lat: -10,
            lng: 10,
          },
          {
            lat: -20,
            lng: 20,
          },
        ),
      ).toMatchInlineSnapshot(`1544757.5610296098`);
    });
  });
});
