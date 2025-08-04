<script setup lang=ts>
import ClientTypeSwitch from '~/components/client/ClientTypeSwitch.vue'
import AppHeaderDivider from '~/components/header/AppHeaderDivider.vue'
import AppHeaderLink from '~/components/header/AppHeaderLink.vue'
import TheLocaleSelector from '~/components/locale/TheLocaleSelector.vue'
import AppContainer from '~base/components/app/container/AppContainer.vue'

const i18n = useI18n()
</script>

<template>
  <section class="py-md bg-black">
    <AppContainer>
      <div class="gap-2xl flex flex-wrap justify-between">
        <!-- Column  -->
        <ClientTypeSwitch />

        <!-- Column -->
        <div class="gap-2xl flex flex-wrap items-center">
          <nav>
            <ul class="gap-3xl flex">
              <AppHeaderLink
                :label="i18n.t('app.header.sub.nav.duco_tv.label')"
                color="light"
              />
              <AppHeaderLink
                :label="i18n.t('app.header.sub.nav.tools_downloads.label')"
                color="light"
              />
              <AppHeaderLink
                :label="i18n.t('app.header.sub.nav.dealer_locator.label')"
                color="light"
              />
            </ul>
          </nav>

          <AppHeaderDivider />

          <AppHeaderLink
            :label="i18n.t('app.header.sub.webshop.label')"
            icon="cart"
            href="https://shop.duco.eu"
            color="light"
          />

          <AppHeaderDivider />

          <AppHeaderLink
            :label="i18n.t('app.header.sub.client_portal.label')"
            icon="user"
            color="light"
          />

          <TheLocaleSelector />
        </div>
      </div>
    </AppContainer>
  </section>
</template>
