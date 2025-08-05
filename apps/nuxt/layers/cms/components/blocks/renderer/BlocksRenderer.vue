<script setup lang="ts">
import BlocksHero from '@cms/components/blocks/hero/BlocksHero.vue'
import BlocksKpi from '@cms/components/blocks/kpi/BlocksKpi.vue'
import BlocksRendererError from '@cms/components/blocks/renderer/BlocksRendererError.vue'
import BlocksRendererNotSupported from '@cms/components/blocks/renderer/BlocksRendererNotSupported.vue'
import type { Page } from '@repo/payload-types'

import { NuxtErrorBoundary } from '#components'

interface Props {
  blocks: Page['blocks']
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col">
    <template
      v-for="(block) in blocks"
      :key="JSON.stringify(block)"
    >
      <NuxtErrorBoundary>
        <BlocksHero
          v-if="block.blockType === 'hero'"
          :block="block"
        />
        <BlocksKpi
          v-else-if="block.blockType === 'kpi'"
          :block="block"
        />
        <BlocksRendererNotSupported
          v-else
          :block-name="(block as any).blockType ?? 'Unknown'"
        />
        <template #error>
          <BlocksRendererError />
        </template>
      </NuxtErrorBoundary>
    </template>
  </div>
</template>
