<script setup lang="ts">
import type { Icon } from '@repo/payload-types'

import { getEnv } from '~base/utils/env/getEnv.utils'

interface Props {
  icon: string | Icon
}

const props = defineProps<Props>()

const { CMS_BASE_URL } = getEnv()

function getIconUrl(url: string): string {
  return `${CMS_BASE_URL}/${url}`
}
</script>

<template>
  <img
    v-if="props.icon.url"
    :src="getIconUrl(image.url)"
    :alt="icon.alt ?? ''"
    :class="$attrs.class"
  >
</template>
