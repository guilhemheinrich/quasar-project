<template>
  <div>
    <q-btn label="Get Info" type="button" color="primary" class="qanopee-button" @click="getInfo()" />
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth';
import { ref, Ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

import { OAuth2Client } from 'google-auth-library'
import { createClient } from '@supabase/supabase-js'


const router = useRouter();

const currentURL = window.location.href;
const url = new URL(currentURL);
// Récupérez la valeur du paramètre "access_token"
const hashParams = router.currentRoute.value.hash;
// const access_token = url.searchParams.get('access_token');

const supabase = createClient(
  <string>process.env.VITE_SUPABASE_URL,
  <string>process.env.VITE_SUPABASE_ANON_KEY
)

onMounted(async () => {
  console.log(currentURL)
  return


});

const getInfo = async () => {
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    // user contient les informations de l'utilisateur
    console.log("Informations de l'utilisateur:", user);

    // // session contient les informations de la session
    // console.log('Informations de la session:', session);
  } else {
    console.log("L'utilisateur n'est pas authentifié.");
  }

  // Vous pouvez ensuite découper la chaîne hashParams pour obtenir les paramètres individuels.
  const paramsArray = hashParams.substring(1).split('&');

  // Créez un objet pour stocker les paramètres
  const queryParams: {
    [key: string]: string
  } = {};

  // Parcourez les paramètres et stockez-les dans l'objet queryParams
  paramsArray.forEach(param => {
    const [key, value] = param.split('=');
    queryParams[key] = value;
  });

  // Vous pouvez maintenant accéder aux paramètres individuellement
  console.log(queryParams.access_token); // Affiche la valeur de access_token
  console.log(queryParams.token_type);   // Affiche la valeur de token_type
  console.log(queryParams.expires_in);   // Affiche la valeur de expires_in
  console.log(queryParams.scope);        // Affiche la valeur de scope

  const body = {
    access_token: queryParams.access_token,
    scope: queryParams.scope
  }

  console.log(body)

  const { data, error } = await supabase.functions.invoke('get-google-info', {
    body: JSON.stringify(body)
  })

  // const { data, error } = await supabase.functions.invoke('hello-world', {
  //   body: JSON.stringify({ name: 'bob' })
  // })
  console.log(data)
  return null
}
</script>

<style scoped lang="scss"></style>
