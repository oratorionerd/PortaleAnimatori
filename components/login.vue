<template>
    <div class="text-center">
        <v-dialog v-model="props.dialog">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Login</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="handleLogin">
                        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

                        <v-btn type="submit" class="button block" :loading="loading">
                            Invia link di autenticazione
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

  
<script setup lang="ts">
const props = defineProps({
  dialog: Boolean
})
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')
const valid = ref(true)
const emailRules = [
    (v: string) => !!v || 'E-mail is required',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]

async function handleLogin() {
    try {
        loading.value = true
        const { error } = await supabase.auth.signInWithOtp({ email: email.value })
        if (error) throw error
        alert('Check your email for the login link!')
    } catch (error: any) {
        alert(error.error_description || error.message)
    } finally {
        loading.value = false
    }
}

/*
async function signOut() {
    try {
        loading.value = true
        let { error } = await supabase.auth.signOut()
        if (error) throw error
        user.value = null
    } catch (error: any) {
        alert(error?.message)
    } finally {
        loading.value = false
    }
}
*/

</script>