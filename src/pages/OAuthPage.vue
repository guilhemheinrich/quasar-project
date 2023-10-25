<template>
  <div class="container">
    <div class="connexion">
      <div id="connexion-container row">
        <h1>Se connecter</h1>
      </div>
      <q-form @submit="onSubmit" class="form-container">
        <q-input class="qanopee-text-large" v-model="email" label="Email" hint="Votre email" type="email" lazy-rules
          :rules="emailRules" />


        <div class="flex-container qanopee-text-large" style="justify-content: center">
          <q-btn label="Se connecter" type="submit" color="primary" class="qanopee-button" />
        </div>
      </q-form>
    </div>

    <q-btn label="Try me" type="button" color="primary" class="qanopee-button" @click="getAuthenticatedClient()" />
  </div>
</template>


<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth';
import { computed, ref, Ref } from 'vue'
import { useRouter } from 'vue-router';
import { OAuth2Client } from 'google-auth-library'


// Vous pouvez maintenant utiliser useAuthStore dans votre composant
const authStore = useAuthStore();
const router = useRouter();
const $q = useQuasar()

const email: Ref<string> = ref('')
const password: Ref<string> = ref('')

const authEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
const clientId = <string>process.env.GOOGLE_WEB_client_id;
const redirectUri = 'http://localhost:9000';
const scope = 'https://www.googleapis.com/auth/userinfo.profile';
const responseType = 'code';

const emailRules = computed(() => [
  (v: string) => !!v || 'Le champ email est requis',
  (v: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v) || "L'adresse email n'est pas valide",
])


/**
* Create a new OAuth2Client, and go through the OAuth2 content
* workflow.  Return the full client to the callback.
*/
const getAuthenticatedClient = () => {
  console.log('plop')


  // Construisez l'URL d'autorisation OAuth2
  const authorizationUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
  console.log(authorizationUrl)
  // Redirigez l'utilisateur vers l'URL d'autorisation
  window.location.href = authorizationUrl;

}

const onSubmit = async () => {

  await authStore.login(email.value, password.value);
  router.push({
    name: 'home'
  })
  return true
}


</script>

<style lang="scss">
.form-container {
  width: 50vw;

  padding-top: 10vh;
}

.container {
  display: flex;
  justify-content: center;
  /* Centrage horizontal */
  align-items: center;
  /* Centrage vertical */


  height: 100vh;
  width: 100vw;
}


h1 {
  padding-left: 15px;
  padding-right: 15px;

}

h2 {
  padding-left: 10px;
  padding-right: 10px;
}

.flex-container {
  display: flex;
  flex-direction: row;
}

.connexion {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: normal;
  align-items: center;
  align-content: normal;

  background-color: rgba(0, 0, 0, 0.06);
  border-radius: 16px;

  width: 70%;
  height: 70%;

  align-self: center;
}
</style>
