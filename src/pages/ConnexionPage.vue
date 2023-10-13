<template>
    <div class="container">
        <div class="connexion">
            <div id="connexion-container row">
                <h1>Se connecter</h1>
            </div>
            <div class="flex-container row">
                <h2>Vous n'avez pas de compte ?</h2>
                <h2 class="underline">S'inscrire</h2>
            </div>


            <q-form @submit="onSubmit" class="form-container">
                <q-input class="qanopee-form-row" v-model="email" label="Email" hint="Votre email" type="email" lazy-rules
                    :rules="emailRules" />


                <div class="qanopee-form-row">
                    <q-input v-model="password" label="Mot de passe" hint="Mot de passe"
                        :type="showPassword ? 'password' : 'text'" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please type something']">
                        <template v-slot:append>
                            <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="showPassword = !showPassword" />
                        </template>
                    </q-input>
                </div>


                <div class="flex-container qanopee-form-row" style="justify-content: center">
                    <q-btn label="Se connecter" type="submit" color="primary" class="qanopee-button" />
                </div>
            </q-form>



        </div>
    </div>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { defineProps, computed, ref, watch, onMounted, onUnmounted, Ref, reactive } from 'vue'

const $q = useQuasar()

const email: Ref<string> = ref('')
const password: Ref<string> = ref('')
const showPassword: Ref<boolean> = ref(false)
const isPwd: Ref<boolean> = ref(true)

const emailRules = computed(() => [
    (v: string) => !!v || 'Le champ email est requis',
    (v: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v) || "L'adresse email n'est pas valide",
])

const onSubmit = () => {
    console.log(email.value)
    console.log(password.value)

    return true
}

const onReset = () => {
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



.row-right {
    justify-content: flex-end;
}

.row-left {
    justify-content: flex-start;
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