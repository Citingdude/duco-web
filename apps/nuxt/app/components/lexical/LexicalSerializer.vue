<script setup lang="ts">
import LexicalHeading from '~/components/lexical/LexicalHeading.vue'
import LexicalImage from '~/components/lexical/LexicalImage.vue'
import LexicalLink from '~/components/lexical/LexicalLink.vue'
import LexicalList from '~/components/lexical/LexicalList.vue'
import LexicalParagraph from '~/components/lexical/LexicalParagraph.vue'
import LexicalQuote from '~/components/lexical/LexicalQuote.vue'
import type { LexicalNode } from '~/models/lexical/lexicalNode.model'
import { lexicalNodeSchema } from '~/models/lexical/lexicalNode.model'

interface RichTextNode {
  [k: string]: unknown
  type: string
  version: number
}

const props = withDefaults(defineProps<{
  color?: 'dark' | 'light'
  root: any
}>(), {
  color: 'dark',
})

function validateNode(node: (RichTextNode)): LexicalNode | null {
  try {
    return lexicalNodeSchema.parse(node)
  }
  catch (error) {
    console.error(`Validation failed for node of type "${node.type}":`, error)
    console.error(node)

    return null
  }
}

const validatedNodes = computed<LexicalNode[]>(() => {
  const nodes = props.root?.children

  if (!nodes) {
    return []
  }

  const validChildren = nodes
    .map(validateNode)
    .filter((node: any): node is LexicalNode => node !== null)

  return validChildren
})
</script>

<template>
  <div
    :class="props.color === 'light'
      ? `
        text-fg-white
        prose-headings:text-fg-white
        prose-blockquote:text-fg-white prose-blockquote:border-accent
        prose-blockquote:bg-accent-light/10 prose-blockquote:rounded-r-lg
      `
      : 'text-black'"
    class="
      prose prose-xl
      prose-a:text-accent
    "
  >
    <template v-if="validatedNodes.length > 0">
      <div
        v-for="(node, i) in validatedNodes"
        :key="i"
      >
        <LexicalParagraph
          v-if="node.type === 'paragraph'"
          :node="node"
        />
        <LexicalList
          v-else-if="node.type === 'list'"
          :node="node"
        />
        <LexicalLink
          v-else-if="node.type === 'link'"
          :node="node"
        />
        <LexicalImage
          v-else-if="node.type === 'upload'"
          :node="node"
        />
        <LexicalHeading
          v-else-if="node.type === 'heading'"
          :node="node"
        />
        <LexicalQuote
          v-else-if="node.type === 'quote'"
          :node="node"
        />
        <span
          v-else
          class="border-accent border p-2"
        />
      </div>
    </template>
  </div>
</template>
