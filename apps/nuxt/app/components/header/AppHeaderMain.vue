<script setup lang="ts">
import {
  VcButton,
  VcIcon,
} from '@wisemen/vue-core-components'

import AppHeaderDivider from '~/components/header/AppHeaderDivider.vue'
import AppHeaderLink from '~/components/header/AppHeaderLink.vue'
import HeaderLogo from '~/components/header/HeaderLogo.vue'
import AppContainer from '~base/components/app/container/AppContainer.vue'

const i18n = useI18n()
</script>

<template>
  <section class="bg-white to-transparent py-6">
    <AppContainer>
      <div
        class="bg-primary-500 flex flex-wrap items-center justify-between"
      >
        <!-- Column -->
        <HeaderLogo />

        <!-- Column -->
        <div class="flex flex-wrap items-center justify-end gap-4">
          <nav>
            <ul class="gap-2xl flex flex-wrap items-center">
              <li>
                <AppHeaderLink
                  :label="i18n.t('app.header.main.nav.products.label')"
                />
              </li>
              <li>
                <AppHeaderLink
                  :label="i18n.t('app.header.main.nav.applications.label')"
                />
              </li>
              <li>
                <AppHeaderLink
                  :label="i18n.t('app.header.main.nav.references.label')"
                />
              </li>
              <li>
                <AppHeaderLink
                  :label="i18n.t('app.header.main.nav.news_events.label')"
                />
              </li>
              <li>
                <AppHeaderLink
                  :label="i18n.t('app.header.main.nav.about_us.label')"
                />
              </li>
            </ul>
          </nav>

          <div class="gap-lg flex">
            <VcButton>
              {{ i18n.t('component.button.service_contact.label') }}
            </VcButton>
            <VcButton variant="secondary">
              {{ i18n.t('component.button.calculate_offer.label') }}
            </VcButton>
          </div>

          <AppHeaderDivider />

          <VcIcon
            class="size-xl text-black"
            icon="search"
          />
        </div>
      </div>
    </AppContainer>
  </section>
</template>
