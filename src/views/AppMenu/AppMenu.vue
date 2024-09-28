<script setup lang="ts">
import 'leaflet/dist/leaflet.css';

import { TabGroup, TabPanels } from '@headlessui/vue';
import StyledTabList from '../../components/Tab/StyledTabList.vue';
import StyledTabButton from '../../components/Tab/StyledTabButton.vue';
import StyledTabPanel from '../../components/Tab/StyledTabPanel.vue';
import ClosestParking from './ClosestParking.vue';
import AppSettings from './AppSettings.vue';
import AppInfo from './AppInfo.vue';
</script>

<template>
  <div class="flex h-full flex-col items-center gap-4">
    <h1 class="text-3xl font-bold">{{ $t('name') }}</h1>

    <div class="flex h-full w-full max-w-prose flex-col gap-2">
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

        <TabPanels class="flex-grow">
          <StyledTabPanel><ClosestParking /></StyledTabPanel>
          <StyledTabPanel><AppInfo /></StyledTabPanel>
          <StyledTabPanel><AppSettings /></StyledTabPanel>
        </TabPanels>
      </TabGroup>
    </div>

    <TabTest />
  </div>
</template>
