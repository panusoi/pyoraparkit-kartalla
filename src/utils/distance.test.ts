import { describe, it, expect } from 'vitest';

import { formatDistance } from './distance';

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
});
