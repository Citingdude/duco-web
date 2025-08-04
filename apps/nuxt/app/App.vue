<script setup lang="ts">
import {
  VcConfigProvider,
  VcDialogContainer,
  VcThemeProvider,
  VcToastContainer,
} from '@wisemen/vue-core-components'
import { ConfigProvider as RekaConfigProvider } from 'reka-ui'

import {
  NuxtLayout,
  NuxtLoadingIndicator,
  NuxtPage,
} from '#components'
import { useTheme } from '~base/composables/theme/theme.composable'

function useIdFunction() {
  return useId()
}

const { theme } = useTheme()
const locale = useI18n().locale
</script>

<template>
  <div class="font-body flex w-screen flex-1">
    <div class="w-full">
      <RekaConfigProvider :use-id="useIdFunction">
        <VcConfigProvider :locale="locale">
          <VcThemeProvider
            :theme="theme"
            appearance="light"
          >
            <NuxtLoadingIndicator color="#FFFFFF" />
            <NuxtLayout>
              <NuxtPage />
            </NuxtLayout>
            <Teleport to="#teleports">
              <VcDialogContainer />
              <VcToastContainer />
            </Teleport>
          </VcThemeProvider>
        </VcConfigProvider>
      </RekaConfigProvider>
    </div>
  </div>
</template>
