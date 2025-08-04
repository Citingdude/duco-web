<script setup lang="ts">
import { VcSwitch } from '@wisemen/vue-core-components'
import { ref } from 'vue'

type ClientType = 'private' | 'professional'

const clientType = ref<ClientType>('private')

const computedValue = computed<boolean>({
  get() {
    if (clientType.value === 'private') {
      return true
    }

    return false
  },
  set(value) {
    if (value) {
      return clientType.value = 'private'
    }

    return clientType.value = 'professional'
  },
})

const i18n = useI18n()
</script>

<template>
  <div class="gap-md flex items-center text-white">
    <span
      :class="[
        {
          'font-bold': clientType === 'professional',
          'opacity-40': clientType === 'private',
        },
      ]"
      class="ease text-sm transition"
    >
      {{ i18n.t('component.client_type_switch.professional.label') }}
    </span>
    <VcSwitch
      v-model="computedValue"
    />
    <span
      :class="[
        {
          'font-bold': clientType === 'private',
          'opacity-40': clientType === 'professional',
        },
      ]"
      class="ease text-sm text-white transition"
    >
      {{ i18n.t('component.client_type_switch.private.label') }}
    </span>
  </div>
</template>
