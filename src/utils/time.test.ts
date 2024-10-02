import { describe, it, expect } from 'vitest';
import { getDistanceToNow } from './time';

describe('time utils', () => {
  describe('getDistanceToNow', () => {
    const now = new Date('2020-01-01T01:00:00').getTime();

    it('returns distance to now in seconds, rounded to the nearest integer', () => {
      expect(
        getDistanceToNow(new Date('2020-01-01T00:59:30').getTime(), now),
      ).toMatchInlineSnapshot(`30`);
      expect(
        getDistanceToNow(new Date('2020-01-01T00:58:00').getTime(), now),
      ).toMatchInlineSnapshot(`120`);
      expect(
        getDistanceToNow(new Date('2020-01-01T00:00:00').getTime(), now),
      ).toMatchInlineSnapshot(`3600`);
      expect(
        getDistanceToNow(new Date('2020-01-01T01:00:10').getTime(), now),
      ).toMatchInlineSnapshot(`-10`);
    });
  });
});
