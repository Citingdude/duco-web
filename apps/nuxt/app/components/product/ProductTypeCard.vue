<script setup lang="ts">
import CmsImage from '@cms/components/image/CmsImage.vue'
import type { Icon } from '@wisemen/vue-core-components'
import { VcIcon } from '@wisemen/vue-core-components'

import { NuxtLink } from '#components'

export interface ProductTypeCardProps {
  title: string
  body: string
  icon: string | Icon
}

const props = defineProps<ProductTypeCardProps>()
</script>

<template>
  <NuxtLink
    :to="{
      name: 'index',
    }"
    class="
      hover:text-fg-white hover:bg-black
      ease p-lg gap-2xl flex items-center justify-between rounded-xl bg-white
      text-black transition
    "
  >
    <!-- Column -->
    <div class="gap-2xl flex items-center">
      <div
        class="
          size-6xl bg-brand-100 flex items-center justify-center rounded-full
          xl:size-7xl
        "
      >
        <CmsImage
          :image="props.icon"
          class="
            size-2xl
            xl:size-3xl
          "
        />
      </div>

      <h3
        class="
          lg:text-display-xs
          leading-full text-xl font-bold
        "
      >
        {{ props.title }}
      </h3>
    </div>

    <!-- Column -->
    <div class="gap-2xl flex items-center">
      <p class="text-bold leading-full">
        {{ props.body }}
      </p>

      <VcIcon
        class="size-xl"
        icon="arrowRight"
      />
    </div>
  </NuxtLink>
</template>
