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
    </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, ref, watch, onMounted, onUnmounted, Ref, reactive } from 'vue'

const isStarred = ref(false);
const password: Ref<string> = ref('')
const showPassword: Ref<boolean> = ref(false)
const toggleStar = () => {
    isStarred.value = !isStarred.value;
};

const togglePasswordVisibility = () => {
    console.log('toggled')
    console.log(process.env.VITE_SUPABASE_URL)
    console.log(showPassword.value)
    showPassword.value = !showPassword.value
}
</script>
  

<style lang="scss"></style>