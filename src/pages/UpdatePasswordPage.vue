<template>
  <q-card class="q-mx-md fixed-center" style="max-width: 400px;">
    <q-card-section>
      <div class="text-h6 text-center q-mb-md">
        Réinitialisation de mot de passe
      </div>
      <q-form @submit="updatePassword">
        <q-input outlined type="password" v-model="newPassword" label="Nouveau mot de passe" required />
        <q-input outlined type="password" v-model="confirmPassword" label="Confirmez le mot de passe" required />
        <q-btn type="submit" color="primary" label="Changer le mot de passe" />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { auth } from '@googleapis/calendar';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';


const newPassword = ref('');
const confirmPassword = ref('');
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const updatePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    // Gérer la non-correspondance des mots de passe
    return;
  }

  await authStore.resetPassword(newPassword.value)
  // Après la mise à jour du mot de passe avec succès, rediriger l'utilisateur
  router.push('/connexion'); // Rediriger vers la page de connexion
};
</script>
