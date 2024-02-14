<template>
  <div class="container">
    <div class="connexion">
      <div id="connexion-container row">
        <h1>Créer un compte</h1>
      </div>
      <div class="flex-container row">
        <h2>Vous avez déja un compte ?</h2>
        <h2 class="underline cursor-pointer" @click="router.push('connexion')">Se connecter</h2>
      </div>
      <q-form @submit="handleSubmit">
        <q-input class="qanopee-text-large" v-model="email" label="Email" hint="Votre email" type="email" lazy-rules
          :rules="emailRules" />
        <div class="qanopee-text-large">
          <q-input v-model="password" label="Mot de passe" hint="Mot de passe" :type="showPassword ? 'text' : 'password'"
            lazy-rules :rules="[val => val && val.length > 0 || 'Please type something']">
            <template v-slot:append>
              <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                @click="showPassword = !showPassword" />
            </template>
          </q-input>
        </div>
        <div class="qanopee-text-large">
          <q-input v-model="confirmPassword" label="Confirmer le mot de passe" hint="Mot de passe"
            :type="showPassword ? 'text' : 'password'" lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type something']">
            <template v-slot:append>
              <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                @click="showPassword = !showPassword" />
            </template>
          </q-input>
        </div>
        <q-btn label="S'inscrire" type="submit" color="primary" />
      </q-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, Ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword: Ref<boolean> = ref(false)

const emailRules = computed(() => [
  (v: string) => !!v || 'Le champ email est requis',
  (v: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v) || "L'adresse email n'est pas valide",
])

const handleSubmit = () => {
  if (password.value !== confirmPassword.value) {
    // Gérer ici le cas où les mots de passe ne correspondent pas
    console.log('Les mots de passe ne coincide pas')
    return;
  }

  // Effectuer ici la logique d'inscription, par exemple :
  authStore.signUpEmail(email.value, password.value);

  // Réinitialiser les champs après l'inscription réussie
  email.value = '';
  password.value = '';
  confirmPassword.value = '';
};
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

