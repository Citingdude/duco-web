<script setup lang="ts">
import type { LexicalHeadingNode } from '~/models/lexical/lexicalHeadingNode.model'
import { lexicalTextNodeSchema } from '~/models/lexical/lexicalTextNode.model'

const props = defineProps<{
  node: LexicalHeadingNode
}>()
</script>

<template>
  <component :is="props.node.tag">
    <lexicalTextNodeSchema
      v-for="(childNode, index) in props.node.children"
      :key="index"
      :node="childNode"
    />
  </component>
</template>
