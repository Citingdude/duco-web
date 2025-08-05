<script setup lang="ts">
import { usePageQuery } from '@cms/api/page/query/usePage.query'
import { useLivePreview } from '@cms/composables/useLivePreview'
import PageView from '@cms/views/PageView.vue'

import { getEnv } from '~base/utils/env/getEnv.utils'

const { CMS_BASE_URL } = getEnv()

const pageQuery = usePageQuery({ slug: 'home' })

await pageQuery.suspense()

const { data } = useLivePreview({
  initialData: pageQuery.data,
})

const ogImage = computed<string>(() => {
  if (!data.value?.seo?.image) {
    return ''
  }

  if (typeof data.value.seo?.image === 'string') {
    return getImageUrl(data.value.seo?.image)
  }

  return getImageUrl(data.value.seo?.image.sizes?.card?.url ?? '')
})

function getImageUrl(url: string): string {
  return `${CMS_BASE_URL}/${url}`
}

const head = useLocaleHead({
  dir: true,
  lang: true,
  seo: true,
})

useHead(() => ({
  htmlAttrs: {
    lang: head.value.htmlAttrs!.lang,
  },
}))

useSeoMeta({
  title: data.value?.seo?.title,
  description: data.value?.seo?.description,
  ogDescription: data.value?.seo?.description,
  ogImage: ogImage.value,
  ogTitle: data.value?.seo?.title,
  twitterCard: 'summary',
  twitterDescription: data.value?.seo?.description,
  twitterImage: ogImage.value,
  twitterTitle: data.value?.seo?.title,
})
</script>

<template>
  <div class="w-full">
    <PageView
      v-if="data"
      :page="data"
    />
  </div>
</template>
