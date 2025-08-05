<script setup lang="ts">
import LexicalListItem from '~/components/lexical/LexicalListItem.vue'
import type { LexicalListNode } from '~/models/lexical/lexicalListNode.model'

const props = defineProps<{
  node: LexicalListNode
}>()
</script>

<template>
  <component :is="node.tag">
    <LexicalListItem
      v-for="(childNode, index) in props.node.children"
      :key="index"
      :node="childNode"
    />
  </component>
</template>
