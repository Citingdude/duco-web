<script setup lang="ts">
import type { LexicalUploadNode } from '~/models/lexical/lexicalUploadNode.model'

const props = defineProps<{
  node: LexicalUploadNode
}>()
</script>

<template>
  <img
    :src="props.node.value.url"
    :alt="props.node.value.alt"
    :width="props.node.value.width"
    :height="props.node.value.height"
    :style="{
      'object-position': `${props.node.value.focalX} ${props.node.value.focalY}`,
    }"
    class="w-full rounded-xl object-cover"
  >
</template>
