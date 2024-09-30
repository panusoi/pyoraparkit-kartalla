<script setup lang="ts">
import ExternalLink from '../../components/ExternalLink.vue';
import { tampereParkingSpotsUpdatedAt } from '../../data/tampere';
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2>{{ $t('info.dataSources.header') }}</h2>

    <h3>Tampere</h3>
    <p>
      <i18next :translation="$t('info.dataSources.tampere.attribution')">
        <template #sourceLink>
          <ExternalLink
            href="https://data.tampere.fi/data/dataset/tampereen-pyoraparkit"
            text="Tampereen pyöräparkit"
          />
        </template>
        <template #sourceServiceLink>
          <ExternalLink href="https://data.tampere.fi/" text="Tampereen kaupungin dataportaali" />
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
  </div>
</template>
