<script setup lang="ts">
import {
  VcButton,
  VcDropdownMenu,
  VcDropdownMenuGroup,
  VcDropdownMenuItem,
  VcIcon,
} from '@wisemen/vue-core-components'

const { locale, locales } = useI18n()

type LocaleObject = typeof locales.value[number]
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed<LocaleObject[]>(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})
</script>

<template>
  <VcDropdownMenu>
    <template #trigger>
      <VcButton
        variant="secondary"
      >
        <span class="gap-md flex items-center">
          <VcIcon
            class="size-xl text-brand-100"
            icon="globe"
          />
          <span class="uppercase">
            {{ locale }}
          </span>
        </span>
      </VcButton>
    </template>

    <template #content>
      <VcDropdownMenuGroup>
        <VcDropdownMenuItem
          v-for="item in availableLocales"
          :key="item.code"
          :label="item.code"
          class="uppercase"
          @select="navigateTo(switchLocalePath(item.code))"
        />
      </VcDropdownMenuGroup>
    </template>
  </VcDropdownMenu>
</template>
