<script setup lang="ts">
const props = defineProps<{
  title: string
  subtitle: string
  value: string
}>()
</script>

<template>
  <div class="flex flex-col">
    <span class="text-sm font-bold">
      {{ props.title }}
    </span>

    <span
      class="
        text-display-xs text-brand-500 mt-xl font-medium
        sm:text-display-xl
      "
    >
      {{ props.value }}
    </span>

    <span class="font-medium text-black">
      {{ props.subtitle }}
    </span>
  </div>
</template>
