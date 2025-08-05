<script setup lang="ts">
import LexicalText from '~/components/lexical/LexicalText.vue'
import type { LexicalQuoteNode } from '~/models/lexical/lexicalQuoteNode.model'

const props = defineProps<{
  node: LexicalQuoteNode
}>()
</script>

<template>
  <blockquote>
    <span
      v-for="(childNode, index) in props.node.children"
      :key="index"
    >
      <LexicalText :node="childNode" />
    </span>
  </blockquote>
</template>
