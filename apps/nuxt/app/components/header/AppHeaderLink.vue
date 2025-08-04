<script setup lang="ts">
import type { Icon } from '@wisemen/vue-core-components'
import { VcIcon } from '@wisemen/vue-core-components'

const props = withDefaults(defineProps<{
  color?: 'dark' | 'light'
  icon?: Icon
  label: string
}>(), {
  color: 'dark',
})
</script>

<template>
  <a
    :class="[
      {
        'text-white': props.color === 'light',
        'text-black': props.color === 'dark',
      },
    ]"
    class="
      hover:text-brand-tertiary
      gap-md ease flex items-center text-sm font-medium transition
    "
  >
    <VcIcon
      v-if="props.icon"
      :icon="props.icon"
      class="size-xl text-brand-100"
    />
    <span>
      {{ props.label }}
    </span>
  </a>
</template>
