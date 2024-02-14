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
// import * as google from 'googleapis'
import { calendar } from '@googleapis/calendar'
import axios, { AxiosResponse, AxiosError } from 'axios';


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
  const { data: { session } } = await supabase.auth.getSession()

  if (user) {
    // user contient les informations de l'utilisateur
    console.log("Informations de l'utilisateur:", user);

    // // session contient les informations de la session
    // console.log('Informations de la session:', session);
  } else {
    console.log("L'utilisateur n'est pas authentifié.");
  }


  if (session) {
    // user contient les informations de l'utilisateur
    console.log('Informations de la session:', session);

    // L'URL de l'API Google Calendar
    const apiUrl = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

    // L'en-tête d'autorisation avec le jeton d'accès
    const headers = {
      Authorization: `Bearer ${session.provider_token}`
    };

    // Configuration de la requête Axios
    const config = {
      method: 'GET', // Vous pouvez ajuster la méthode HTTP si nécessaire (GET, POST, etc.).
      url: apiUrl,
      headers: headers
    };

    // Effectuer la requête HTTP
    axios(config)
      .then((response: AxiosResponse) => {
        // Gérer la réponse ici
        console.log('Réponse de l\'API Google Calendar :', response.data);
      })
      .catch((error: AxiosError) => {
        // Gérer les erreurs ici
        console.error('Erreur lors de la requête vers l\'API Google Calendar :', error);
      });

    const supabase_local = createClient(
      <string>process.env.LOCAL_VITE_SUPABASE_URL,
      <string>process.env.LOCAL_VITE_SUPABASE_ANON_KEY
    )
    const body = {
      access_token: session.provider_token
    }

    const { data, error } = await supabase_local.functions.invoke('get-google-info', {
      body: JSON.stringify(body)
    })

    // console.log(data)



    // Récupération des infos de calendar
    // const googleAuth = new OAuth2Client(
    //   {
    //     clientId: <string>process.env.GOOGLE_WEB_client_id,
    //     clientSecret: <string>process.env.GOOGLE_WEB_client_secret
    //   }
    // )
    // googleAuth.setCredentials({ access_token: session.access_token })
    // // Créez une instance de l'API Google Calendar
    // const user_calendar = calendar('v3')

    // const calendar = new google.calendar_v3.Calendar({
    //   auth: session.access_token
    // })

    // // // Utilisez l'API Google Calendar pour récupérer les événements
    // user_calendar.events.list(
    //   {
    //     calendarId: 'primary', // 'primary' est l'ID par défaut de l'agenda principal de l'utilisateur
    //     timeMin: new Date().toISOString(),
    //     maxResults: 10, // Le nombre maximal d'événements à récupérer
    //     singleEvents: true,
    //     orderBy: 'startTime',
    //   },
    //   (err, res) => {
    //     if (err) {
    //       console.error('Erreur lors de la récupération des événements :', err);
    //       return;
    //     }
    //     if (res != undefined && res != null) {

    //       const events = res.data.items;
    //       if (events?.length) {
    //         console.log('Prochains événements :');
    //         events.forEach((event, i) => {
    //           const start = event?.start?.dateTime || event?.start?.date;
    //           console.log(`${start} - ${event.summary}`);
    //         });
    //       } else {
    //         console.log('Aucun événement à venir.');
    //       }
    //     }
    //   }
    // );
    // console.log('Informations de la session:', session);
  } else {
    console.log("L'utilisateur n'est pas authentifié.");
  }
  // // Vous pouvez ensuite découper la chaîne hashParams pour obtenir les paramètres individuels.
  // const paramsArray = hashParams.substring(1).split('&');

  // // Créez un objet pour stocker les paramètres
  // const queryParams: {
  //   [key: string]: string
  // } = {};

  // // Parcourez les paramètres et stockez-les dans l'objet queryParams
  // paramsArray.forEach(param => {
  //   const [key, value] = param.split('=');
  //   queryParams[key] = value;
  // });

  // // Vous pouvez maintenant accéder aux paramètres individuellement
  // console.log(queryParams.access_token); // Affiche la valeur de access_token
  // console.log(queryParams.token_type);   // Affiche la valeur de token_type
  // console.log(queryParams.expires_in);   // Affiche la valeur de expires_in
  // console.log(queryParams.scope);        // Affiche la valeur de scope

  // const body = {
  //   access_token: queryParams.access_token,
  //   scope: queryParams.scope
  // }

  // console.log(body)

  // const { data, error } = await supabase.functions.invoke('get-google-info', {
  //   body: JSON.stringify(body)
  // })

  // // const { data, error } = await supabase.functions.invoke('hello-world', {
  // //   body: JSON.stringify({ name: 'bob' })
  // // })
  // console.log(data)
  return null
}
</script>

<style scoped lang="scss"></style>
