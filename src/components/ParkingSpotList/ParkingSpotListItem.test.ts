import { describe, it, expect, vi } from 'vitest';

import { mount } from '@vue/test-utils';
import ParkingSpotListItem from './ParkingSpotListItem.vue';

describe('ParkingSpotListItem', () => {
  const spot = {
    area: 'Amuri',
    coordinates: { lat: 1.23, lon: 2.34 },
    id: 'tre:test',
    rack: {
      count: 2,
      frameLock: false,
      manufacturer: 'Example Manufacturer',
      model: 'Example Model',
      spots: 30,
    },
    status: 'IN_USE',
    type: 'BIKE_PARKING',
    image: 'https://localhost/image.png',
  } as const;

  it('renders with image link', () => {
    const wrapper = mount(ParkingSpotListItem, {
      props: {
        spot,
        distance: 100,
      },
    });
    const links = wrapper.findAll('a');
    expect(links).toHaveLength(1);
    expect(links[0].attributes()['href']).toBe(spot.image);
  });

  it('emits showOnMap on button click', async () => {
    const onShowOnMap = vi.fn().mockImplementation(() => undefined);

    const wrapper = mount(ParkingSpotListItem, {
      props: {
        spot,
        distance: 100,
        onShowOnMap,
      },
    });
    const buttons = wrapper.findAll('button');
    expect(buttons).toHaveLength(1);
    await buttons[0].trigger('click');
    expect(onShowOnMap).toHaveBeenCalledOnce();
  });

  it('renders different distances', () => {
    const getDistance = (distance: number) =>
      mount(ParkingSpotListItem, {
        props: {
          spot,
          distance,
        },
      })
        .find('[data-testid="distance"]')
        .text();

    expect([0.1, 1, 10, 100, 1_000, 10_000, 100_000].map(getDistance)).toMatchInlineSnapshot(`
      [
        "< 1 m",
        "1 m",
        "10 m",
        "100 m",
        "1.00 km",
        "10.00 km",
        "> 10 km",
      ]
    `);
  });
});
