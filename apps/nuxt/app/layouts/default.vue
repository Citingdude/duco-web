<script setup lang="ts">
import AppHeader from '~/components/header/AppHeader.vue'
</script>

<template>
  <div>
    <div class="flex min-h-screen flex-col">
      <AppHeader />
      <div class="flex w-full flex-1 flex-col items-center justify-center">
        <slot />
      </div>
    </div>
  </div>
</template>
