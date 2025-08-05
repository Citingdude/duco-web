<script setup lang="ts">
import type { KpiBlock } from '@repo/payload-types'
import { VcButton } from '@wisemen/vue-core-components'

import KpiCard from '~/components/kpi/KpiCard.vue'
import LexicalSerializer from '~/components/lexical/LexicalSerializer.vue'
import AppTextH2 from '~/components/text/AppTextH2.vue'
import AppContainer from '~base/components/app/container/AppContainer.vue'

const props = defineProps<{
  block: KpiBlock
}>()
</script>

<template>
  <section class="py-9xl bg-offwhite">
    <AppContainer class="gap-9xl">
      <div
        class="
          gap-4xl grid grid-cols-6
          lg:gap-8xl
        "
      >
        <div
          class="
            col-span-6
            lg:col-span-3
            xl:col-span-4
          "
        >
          <AppTextH2>
            {{ props.block.title }}
          </AppTextH2>
        </div>

        <div
          class="
            gap-lg col-span-6 flex items-end
            lg:col-span-3
            xl:col-span-2
          "
        >
          <VcButton
            v-for="button in props.block.buttons"
            :key="button.button.label"
            :variant="button.button.ctaVariant || 'primary'"
          >
            {{ button.button.label }}
          </VcButton>
        </div>
      </div>

      <div
        class="
          gap-4xl grid grid-cols-6
          sm:gap-8xl
        "
      >
        <div
          class="
            col-span-6
            lg:col-span-4
          "
        >
          <ul
            v-if="props.block.kpiItems && props.block.kpiItems.length > 0"
            class="
              gap-5xl flex
              lg:gap-11xl
            "
          >
            <li
              v-for="kpi in props.block.kpiItems"
              :key="kpi.kpi.title"
            >
              <KpiCard
                :title="kpi.kpi.title"
                :subtitle="kpi.kpi.subtitle"
                :value="kpi.kpi.value"
              />
            </li>
          </ul>
        </div>

        <div
          class="
            col-span-6
            lg:col-span-2
          "
        >
          <p v-if="props.block.body">
            <LexicalSerializer :root="props.block.body.root" />
          </p>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
