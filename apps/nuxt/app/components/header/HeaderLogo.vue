<script setup lang="ts">
import { NuxtLinkLocale } from '#components'
import AppLogo from '~base/components/app/AppLogo.vue'
</script>

<template>
  <NuxtLinkLocale
    :to="{
      name: 'index',
    }"
    class="focus-ring-white"
  >
    <AppLogo class="max-h-4xl h-12 w-auto" />
  </NuxtLinkLocale>
</template>
