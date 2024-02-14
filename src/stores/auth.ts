import { defineStore } from 'pinia';
import { createClient, User, Session } from '@supabase/supabase-js'
import routes from '../router/routes'
// Créez une instance Supabase en utilisant les variables d'environnement
const supabase = createClient(
  <string>process.env.VITE_SUPABASE_URL,
  <string>process.env.VITE_SUPABASE_ANON_KEY
)

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null as null | User, // Stockez ici les informations de l'utilisateur supabase
    session: null as null | Session, // Stockez ici le jeton d'authentification supabase
    first_name: null as null | string
  }),

  getters: {
    isAuthenticated: (state) => !!state.user, // Vérifiez si l'utilisateur est authentifié
  },

  actions: {

    async signUpEmail(email: string, password: string) {
      try {
        const { data, error } = await supabase.auth.signUp(({
          email: email,
          password: password
        }))
        console.log('user is created')
        console.log(data.user)
      } catch (error: any) {
        console.error('Erreur lors de la création de l\'utilisateur :', error.message);
        // Gérer les erreurs
      }
    },

    async resetPassword(new_password: string) {
      // Logique pour mettre à jour le mot de passe dans Supabase
      try {
        // Utilisez ici la méthode pour mettre à jour le mot de passe dans Supabase
        // Utilisez la méthode de Supabase pour mettre à jour le mot de passe avec newPassword.value

        // Exemple hypothétique :
        await supabase.auth.updateUser({ password: new_password });


      } catch (error: any) {
        console.error('Erreur lors de la mise à jour du mot de passe :', error.message);
        // Gérer les erreurs
      }
    },

    async sendResetEmail(email: string) {
      try {
        const result = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: 'http://localhost:9000/update-password'
        });
        console.log(result)
        // if (result.error) {
        //   throw error;
        // }
        console.log('Email de réinitialisation de mot de passe envoyé avec succès');
      } catch (error: any) {
        console.error('Erreur lors de l\'envoi de l\'email de réinitialisation :', error.message);
      }
    },
    async loginWithPassword(email: string, password: string) {
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

          const { data, error } = await supabase
            .from('bubble_user')
            .select('*')
            .match({ 'authentication->email->>email': user.email })
            .single();

          this.first_name = data?.prenom ?? email
        }
        return true
      } catch (error) {
        console.error('Erreur inattendue:', error);
      }
    },

    async loginWithGoogle() {
      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            },
          },
        })

        if (error) {
          // Gérer l'erreur d'authentification
          console.error('Erreur d\'authentification:', error);
          return;
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
