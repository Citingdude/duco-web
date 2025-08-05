<script setup lang="ts">
import LexicalLinebreak from '~/components/lexical/LexicalLinebreak.vue'
import LexicalLink from '~/components/lexical/LexicalLink.vue'
import LexicalText from '~/components/lexical/LexicalText.vue'
import type { LexicalParagraphNode } from '~/models/lexical/lexicalParagraphNode.model'

const props = defineProps<{
  node: LexicalParagraphNode
}>()
</script>

<template>
  <p>
    <template
      v-for="(child, index) in props.node.children"
      :key="index"
    >
      <LexicalText
        v-if="child.type === 'text'"
        :node="child"
      />
      <LexicalLink
        v-else-if="child.type === 'link'"
        :node="child"
      />
      <LexicalLinebreak v-else-if="child.type === 'linebreak'" />
    </template>
  </p>
</template>
