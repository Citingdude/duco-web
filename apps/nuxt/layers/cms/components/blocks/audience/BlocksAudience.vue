<script setup lang="ts">
import type { AudienceBlock } from '@repo/payload-types'
import { VcButton } from '@wisemen/vue-core-components'

import type { AudienceCardProps } from '~/components/audience/AudienceCard.vue'
import AudienceCard from '~/components/audience/AudienceCard.vue'
import LexicalSerializer from '~/components/lexical/LexicalSerializer.vue'
import AppTextH2 from '~/components/text/AppTextH2.vue'
import AppContainer from '~base/components/app/container/AppContainer.vue'

const props = defineProps<{
  block: AudienceBlock
}>()

const audienceCards = computed<AudienceCardProps[]>(() => {
  const cards: AudienceCardProps[] = []

  if (!props.block.audienceSegmants) {
    return cards
  }

  for (const segment of props.block.audienceSegmants) {
    if (typeof segment === 'string') {
      continue
    }

    cards.push({
      title: segment.title,
      description: segment.description,
      icon: segment.icon,
    })
  }

  return cards
})
</script>

<template>
  <section class="pt-9xl bg-offwhite pb-11xl">
    <AppContainer class="gap-9xl">
      <div class="gap-5xl flex flex-col items-center justify-center">
        <AppTextH2 class="max-w-[740px] text-center">
          {{ props.block.title }}
        </AppTextH2>

        <p
          v-if="props.block.body"
          class="max-w-[500px] text-center"
        >
          <LexicalSerializer :root="props.block.body.root" />
        </p>

        <div
          v-if="props.block.buttons && props.block.buttons.length > 0"
          class="gap-lg flex"
        >
          <VcButton
            v-for="button in props.block.buttons"
            :key="button.button.label"
            :variant="button.button.ctaVariant || 'primary'"
          >
            {{ button.button.label }}
          </VcButton>
        </div>

        <ul
          class="
            gap-2xl grid w-full
            lg:grid-cols-3
          "
        >
          <li
            v-for="card in audienceCards"
            :key="card.title"
          >
            <AudienceCard
              :title="card.title"
              :description="card.description"
              :icon="card.icon"
            />
          </li>
        </ul>
      </div>
    </AppContainer>
  </section>
</template>
