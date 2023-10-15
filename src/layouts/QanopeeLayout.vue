<template>
    <q-layout view="hHh lpR fff">

        <q-drawer side="left" behavior="desktop" v-model="drawer" show-if-above :mini="drawerMini"
            @mouseover="drawerMini = false" @mouseout="drawerMini = true" mini-to-overlay :width="300" :breakpoint="500"
            bordered class="column flex-center">

            <q-list padding class="self-center">
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

                <q-item clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon name="drafts" />
                    </q-item-section>

                    <q-item-section>
                        Drafts
                    </q-item-section>
                </q-item>
            </q-list>

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

const drawer = ref(false)
const drawerMini = ref(true);
</script>

<style scoped lang="scss">
q-drawer {
    fill-opacity: 0.1;
}
</style>