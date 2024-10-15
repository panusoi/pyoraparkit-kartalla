<script setup lang="ts">
import ExternalLink from '../../components/ExternalLink.vue';
import { tampereParkingSpotsUpdatedAt } from '../../data/tampere';
import { buildVersion } from '../../data/version';

import {
  markerBike,
  markerBikeWithLock,
  markerConnection,
  markerConnectionWithLock,
  markerCurrentLocation,
} from '../../assets/markers';

const sectionClass = 'flex flex-col gap-4';
const h2Class = 'text-xl font-bold';
const h3Class = 'text-lg font-bold';
const markerImgClass = 'h-12 p-1';
</script>

<template>
  <div class="flex min-w-72 flex-col gap-4">
    <section :class="sectionClass">
      <h2 :class="h2Class">{{ $t('info.markers.header') }}</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <img :class="markerImgClass" :src="markerBikeWithLock" />
            </td>
            <td>
              {{ $t('parkingSpot.type.BIKE_PARKING') }} ({{
                $t('parkingSpot.frameLock.true').toLowerCase()
              }})
            </td>
          </tr>
          <tr>
            <td><img :class="markerImgClass" :src="markerBike" /></td>
            <td>
              {{ $t('parkingSpot.type.BIKE_PARKING') }}
            </td>
          </tr>
          <tr>
            <td>
              <img :class="markerImgClass" :src="markerConnectionWithLock" />
            </td>
            <td>
              {{ $t('parkingSpot.type.CONNECTION_PARKING') }} ({{
                $t('parkingSpot.frameLock.true').toLowerCase()
              }})
            </td>
          </tr>
          <tr>
            <td>
              <img :class="markerImgClass" :src="markerConnection" />
            </td>
            <td>
              {{ $t('parkingSpot.type.CONNECTION_PARKING') }}
            </td>
          </tr>
          <tr>
            <td>
              <img :class="markerImgClass" :src="markerCurrentLocation" />
            </td>
            <td>
              {{ $t('info.markers.currentLocation') }}
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section :class="sectionClass">
      <h2 :class="h2Class">{{ $t('info.dataSources.header') }}</h2>
      <section :class="sectionClass">
        <h3 :class="h3Class">Tampere</h3>
        <p>
          <i18next :translation="$t('info.dataSources.tampere.attribution')">
            <template #sourceLink>
              <ExternalLink
                href="https://data.tampere.fi/data/dataset/tampereen-pyoraparkit"
                text="Tampereen pyöräparkit"
              />
            </template>
            <template #sourceServiceLink>
              <ExternalLink
                href="https://data.tampere.fi/"
                text="Tampereen kaupungin dataportaali"
              />
            </template>
            <template #licenseLink>
              <ExternalLink
                href="https://creativecommons.org/licenses/by/4.0/"
                text="Creative Commons Attribution 4.0"
              />
            </template>
            <template #date>
              {{ tampereParkingSpotsUpdatedAt }}
            </template>
          </i18next>
        </p>
      </section>
    </section>

    <section :class="sectionClass">
      <span class="max-w-prose text-sm">Version: {{ buildVersion }} </span>
    </section>
  </div>
</template>
