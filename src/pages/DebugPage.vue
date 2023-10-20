<template>
    <div>
        Hello
        <q-icon :name="isStarred ? 'visibility_off' : 'visibility'" size="36px" @click="toggleStar" cursor-pointer />

        <q-input v-model="password" label="Mot de passe" hint="Mot de passe" :type="showPassword ? 'password' : 'text'"
            lazy-rules :rules="[val => val && val.length > 0 || 'Please type something']">
            <template v-slot:append>
                <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="togglePasswordVisibility" />
            </template>
        </q-input>

        <q-btn label="Get geolocalisation" type="button" color="primary" class="qanopee-button" @click="getPosition" />

        <PlaceSearchField></PlaceSearchField>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, ref, watch, onMounted, onUnmounted, Ref, reactive } from 'vue'
import PlaceSearchField from 'src/components/PlaceSearchField.vue';

const getPosition = () => {

    // Vérifie si la géolocalisation est disponible dans le navigateur
    if ('geolocation' in navigator) {
        // Obtenez la géolocalisation de l'utilisateur
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log('Latitude : ' + latitude);
            console.log('Longitude : ' + longitude);

            // Vous pouvez maintenant utiliser les données de géolocalisation comme vous le souhaitez.
        }, function (error) {
            // En cas d'erreur, par exemple si l'utilisateur refuse la géolocalisation, vous pouvez gérer l'erreur ici.
            console.error('Erreur de géolocalisation : ' + error.message);
        });
    } else {
        // La géolocalisation n'est pas prise en charge dans ce navigateur.
        console.error("La géolocalisation n'est pas disponible dans ce navigateur.");
    }
}


const isStarred = ref(false);
const password: Ref<string> = ref('')
const showPassword: Ref<boolean> = ref(false)
const toggleStar = () => {
    isStarred.value = !isStarred.value;
};

const togglePasswordVisibility = () => {
    console.log('toggled')
    if (process.env.DEV) {
        console.log('I\'m on a development build')
    }
    console.log(process.env.VITE_SUPABASE_URL)
    console.log(showPassword.value)
    showPassword.value = !showPassword.value
}
</script>
  

<style lang="scss"></style>