<script setup lang="ts">
import 'leaflet/dist/leaflet.css';

import { TabGroup, TabPanels } from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import StyledTabList from '../../components/Tab/StyledTabList.vue';
import StyledTabButton from '../../components/Tab/StyledTabButton.vue';
import StyledTabPanel from '../../components/Tab/StyledTabPanel.vue';
import ClosestParkingSpots from './ClosestParkingSpots.vue';
import AppSettings from './AppSettings.vue';
import AppInfo from './AppInfo.vue';
import { IsMenuOpenInjectionKey } from '../../injection/menu.injection';
import { injectStrict } from '../../utils/inject';

const isMenuOpen = injectStrict(IsMenuOpenInjectionKey);
</script>

<template>
  <div class="flex h-full flex-col items-center gap-4">
    <div class="just flex w-full flex-row items-center justify-between">
      <h1 class="text-3xl font-bold">{{ $t('name') }}</h1>
      <button
        type="button"
        class="m-2 rounded-full bg-primary-light-100/20 p-1 text-primary-light-500 hover:text-primary-light-700 md:collapse dark:bg-primary-dark-400/20 dark:text-primary-dark-500 dark:hover:text-primary-dark-700"
        :aria-label="$t('menu.close')"
        @click="isMenuOpen = false"
      >
        <XMarkIcon class="size-5" />
      </button>
    </div>

    <div class="flex h-full min-h-0 w-full max-w-prose flex-col gap-2">
      <TabGroup>
        <StyledTabList>
          <StyledTabButton>
            {{ $t('tabs.closest') }}
          </StyledTabButton>
          <StyledTabButton>
            {{ $t('tabs.info') }}
          </StyledTabButton>
          <StyledTabButton>
            {{ $t('tabs.settings') }}
          </StyledTabButton>
        </StyledTabList>

        <TabPanels as="template">
          <StyledTabPanel><ClosestParkingSpots /></StyledTabPanel>
          <StyledTabPanel><AppInfo /></StyledTabPanel>
          <StyledTabPanel><AppSettings /></StyledTabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
</template>
