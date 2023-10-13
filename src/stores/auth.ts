import { defineStore } from 'pinia';
import { createClient, User, Session } from '@supabase/supabase-js'


// Créez une instance Supabase en utilisant les variables d'environnement
const supabase = createClient(
    <string>process.env.VITE_SUPABASE_URL,
    <string>process.env.VITE_SUPABASE_ANON_KEY
)

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null as null | User, // Stockez ici les informations de l'utilisateur
        session: null as null | Session, // Stockez ici le jeton d'authentification
    }),

    getters: {
        isAuthenticated: (state) => !!state.user, // Vérifiez si l'utilisateur est authentifié
    },

    actions: {
        async login(email: string, password: string) {
            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                })

                if (error) {
                    // Gérer l'erreur d'authentification
                    console.error('Erreur d\'authentification:', error);
                    return;
                }

                const { user, session } = data

                if (user && user.id) {
                    this.user = user;
                    this.session = session
                }
                return true
            } catch (error) {
                console.error('Erreur inattendue:', error);
            }
        },

        async logout() {
            try {
                await supabase.auth.signOut();
                this.user = null;
                this.session = null;
            } catch (error) {
                console.error('Erreur lors de la déconnexion:', error);
            }
        },
    },
});

// Exportez le type User pour pouvoir l'utiliser ailleurs dans votre application
export type { User };
