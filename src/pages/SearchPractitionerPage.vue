<template>
    <div class="column flex-center q-pa-xl ">
        <div class="q-pa-lg q-my-xl qa-radius-large col-8 flex-center whiteboard container">
            <h1 class="q-py-xl text-center">
                Trouvez le meilleur praticien proche de chez vous
            </h1>
            <div class="row q-py-xl">
                <div class="col-4">
                    <q-select v-model="selectedItems" :options="filteredOptions" label="Profession" multiple map-options
                        option-label="name" option-value="id" emit-value use-input use-chips filter @filter="filterOptions">
                        <template v-slot:no-option>
                            <q-item>
                                <q-item-section class="text-grey">
                                    Pas de résultats
                                </q-item-section>
                            </q-item>
                        </template>
                    </q-select>
                </div>
            </div>
        </div>
        <div class="q-pa-lg q-my-xl  qa-radius-large col-8 whiteboard container">
            Plip
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth';
import { ref, Ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { createClient } from '@supabase/supabase-js'

// Vous pouvez maintenant utiliser useAuthStore dans votre composant
const authStore = useAuthStore();
const router = useRouter();

interface Profession {
    id: number,
    name: string
}
const professions: Ref<Profession[]> = ref([]);
const selectedItems: Ref<Array<string>> = ref([])
const filteredOptions: Ref<Profession[]> = ref([]); // Options filtrées
onMounted(async () => {
    // Effectuez un appel à la base de données Supabase pour obtenir les données
    // Remplacez cela par votre propre logique de requête Supabase
    await fetchDataFromSupabase();
    filteredOptions.value = professions.value;
});

const supabase = createClient(
    <string>process.env.VITE_SUPABASE_URL,
    <string>process.env.VITE_SUPABASE_ANON_KEY
)

const filterOptions = (input: string, update: any) => {

    if (input == '') {
        update(() => {
            filteredOptions.value = professions.value;
        });
        return
    }
    update(() => {
        filteredOptions.value = professions.value.filter((item) =>
            item.name.toLowerCase().includes(input.toLowerCase())
        );
    })

};
const fetchDataFromSupabase = async () => {
    // Remplacez cette section par votre propre code d'appel Supabase pour récupérer les données
    // Exemple fictif :
    const { data, error } = await supabase
        .from('Profession')
        .select('id, name');

    if (error) {
        console.error('Erreur lors de la récupération des données Supabase:', error);
    } else {
        console.log(data)
        professions.value = data as Profession[];
    }
};


</script>

<style scoped lang="scss">
.container {
    width: 70%;
}


.whiteboard {
    background-color: white;
}
</style>