<script setup lang="ts">
import CmsImage from '@cms/components/image/CmsImage.vue'
import type { Icon } from '@repo/payload-types'
import { VcIcon } from '@wisemen/vue-core-components'

import { NuxtLink } from '#components'

export interface AudienceCardProps {
  title: string
  description: string
  icon: string | Icon
}

const props = defineProps<AudienceCardProps>()
</script>

<template>
  <NuxtLink
    :to="{
      name: 'index',
    }"
    class="
      bg-fg-white p-5xl gap-2xl shadow-custom flex flex-col rounded-xl
      text-black transition ease-in
      hover:text-fg-white hover:bg-black
    "
  >
    <div
      class="
        size-6xl bg-brand-100 flex items-center justify-center rounded-full
      "
    >
      <CmsImage
        :image="props.icon"
        class="size-3xl"
      />
    </div>

    <div class="gap-xs flex flex-col">
      <h3 class="text-display-xs font-bold">
        {{ props.title }}
      </h3>

      <div class="gap-2xl flex justify-between">
        <p class="font-bold">
          {{ props.description }}
        </p>

        <VcIcon
          class="size-xl"
          icon="arrowRight"
        />
      </div>
    </div>
  </NuxtLink>
</template>
