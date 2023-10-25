<template>
  <q-layout view="hHh lpR fff">

    <q-drawer side="left" behavior="desktop" v-model="drawer" show-if-above :mini="drawerMini"
      @mouseover="drawerMini = false" @mouseout="drawerMini = true" mini-to-overlay :width="300" :breakpoint="500"
      bordered>

      <div class="column v-container">

        <div class="col-3">
          Hello {{ authStore.first_name }}
        </div>

        <div class="col-9">

          <q-list padding>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section>
                Acceuil
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="event" />
              </q-item-section>

              <q-item-section>
                Mes rendez-vous
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="leaderboard" />
              </q-item-section>

              <q-item-section>
                Mes dioagnostics
              </q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable v-ripple @click="console.log('pip')">
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                Google auth
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>

      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-8 text-white" reveal>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth';

const authStore = useAuthStore();
const drawer = ref(false)
const drawerMini = ref(true);

// Google OAuth

</script>

<style scoped lang="scss">
.v-container {
  height: 100%;
}
</style>
