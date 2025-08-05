<script setup lang="ts">
import CmsImage from '@cms/components/image/CmsImage.vue'
import type { HeroBlock } from '@repo/payload-types'

import LexicalSerializer from '~/components/lexical/LexicalSerializer.vue'
import type { ProductTypeCardProps } from '~/components/product/ProductTypeCard.vue'
import ProductTypeCard from '~/components/product/ProductTypeCard.vue'
import AppTextH1 from '~/components/text/AppTextH1.vue'
import AppTextSubtitle from '~/components/text/AppTextSubtitle.vue'
import AppContainer from '~base/components/app/container/AppContainer.vue'
import AppTextHighlight from '~base/components/app/text/AppTextHighlight.vue'

interface Props {
  block: HeroBlock
}

const props = defineProps<Props>()

const productTypeCards = computed<ProductTypeCardProps[]>(() => {
  const productTypeCards: ProductTypeCardProps[] = []

  if (!props.block.productsTypes) {
    return []
  }

  for (const productType of props.block.productsTypes) {
    if (typeof productType === 'string') {
      continue
    }

    productTypeCards.push({
      title: productType.title,
      body: productType.description,
      icon: productType.icon,
    })
  }

  return productTypeCards
})
</script>

<template>
  <section
    v-if="block.blockType === 'hero'"
    class="
      bg-offwhite pb-9xl relative flex flex-col items-center justify-center
      overflow-hidden pt-28
    "
  >
    <img
      class="absolute right-0 bottom-0 left-0 h-auto w-full"
      src="/images/waves/home_hero_waves.webp"
      alt=""
    >
    <AppContainer class="relative">
      <div class="gap-5xl flex flex-col items-center text-center">
        <div class="gap-xl flex flex-col">
          <AppTextSubtitle>
            {{ props.block.subtitle }}
          </AppTextSubtitle>

          <AppTextH1>
            <AppTextHighlight>
              <LexicalSerializer :root="props.block.highlightTitle.root" />
            </AppTextHighlight>
          </AppTextH1>
        </div>

        <p class="max-w-[480px]">
          <LexicalSerializer :root="block.body.root" />
        </p>
      </div>

      <div class="gap-4xl mt-2xl grid grid-cols-5 items-center">
        <!-- Column -->
        <div
          class="
            sm:-ml-11xl sm:col-span-3
            col-span-5
          "
        >
          <CmsImage
            v-if="(typeof props.block.backgroundImage !== 'string')"
            :image="props.block.backgroundImage"
            class="max-h-[600px] w-full rounded-br-[50px]"
          />
        </div>

        <!-- Column -->
        <div
          class="
            sm:-ml-10xl sm:col-span-2
            col-span-5
          "
        >
          <ul class="gap-2xl flex flex-col">
            <li
              v-for="productType in productTypeCards"
              :key="productType.title"
            >
              <ProductTypeCard
                :title="productType.title"
                :body="productType.body"
                :icon="productType.icon"
              />
            </li>
          </ul>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
