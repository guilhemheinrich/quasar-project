<template>
  <div class="flex column">

    <q-btn label="Url mode" type="button" color="primary" class="qanopee-button" @click="getAuthenticatedClientURL()" />
    <q-btn label="Popup mode" type="button" color="primary" class="qanopee-button"
      @click="getAuthenticatedClientPopup()" />
  </div>
</template>


<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth';
import { computed, ref, Ref } from 'vue'
import { useRouter } from 'vue-router';
import { OAuth2Client } from 'google-auth-library'
import { createClient } from '@supabase/supabase-js'

// Vous pouvez maintenant utiliser useAuthStore dans votre composant
const authStore = useAuthStore();
const router = useRouter();
const $q = useQuasar()

const email: Ref<string> = ref('')
const password: Ref<string> = ref('')

const authEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
const clientId = <string>process.env.GOOGLE_WEB_client_id;
const clientSecret = <string>process.env.GOOGLE_WEB_client_secret;
// const redirectUri = 'http://localhost:9000';
const redirectUri = 'http://localhost:9000/gauth-redirect';

const scope = 'https://www.googleapis.com/auth/userinfo.profile';
const responseType = 'token';

const supabase = createClient(
  <string>process.env.VITE_SUPABASE_URL,
  <string>process.env.VITE_SUPABASE_ANON_KEY
)


/**
* Create a new OAuth2Client, and go through the OAuth2 content
* workflow.  Return the full client to the callback.
*/
const getAuthenticatedClientURL = () => {
  // Construisez l'URL d'autorisation OAuth2
  const authorizationUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
  // Redirigez l'utilisateur vers l'URL d'autorisation
  window.location.href = authorizationUrl;

}

const getAuthenticatedClientPopup = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: 'http://localhost:9000/google-callback',
      scopes: 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.profile'
    },
  })

  if (error) return

  // // CLeaner way
  // const authenticator = new OAuth2Client({
  //   clientId: clientId,
  //   clientSecret: clientSecret,
  //   // redirectUri: redirectUri
  //   credentials: {
  //     scope: 'https://www.googleapis.com/auth/calendar.readonly',
  //   }
  // })

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
