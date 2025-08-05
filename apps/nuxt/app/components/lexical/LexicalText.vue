<script setup lang="ts">
import type { LexicalTextNode } from '~/models/lexical/lexicalTextNode.model'

const props = defineProps<{
  node: LexicalTextNode
}>()

const textComponent = computed<string>(() => {
  switch (props.node.format) {
    case 0:
      return 'span'

    case 1:
      return 'strong'

    default:
      return 'span'
  }
})
</script>

<template>
  <component :is="textComponent">
    {{ props.node.text }}
  </component>
</template>
