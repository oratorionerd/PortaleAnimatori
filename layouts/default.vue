<template>
    <v-app :theme="'festantonioTheme'">
        <v-app-bar :color="'primary'">

            <v-spacer></v-spacer>
            <v-tabs centered color="grey-darken-2 fill-height">
                <v-tab v-for="link in links" :key="link.name" @click="redirect(link.path)" class="fill-height">
                    {{link.name}}
                </v-tab>
            </v-tabs>
            <v-spacer></v-spacer>
            <!--<v-avatar class="hidden-sm-and-down" color="grey-darken-1"></v-avatar>-->
        </v-app-bar>

        <v-main>
            <slot />
        </v-main>
        <v-footer app bottom fixed class="pa-1">Made with <v-icon icon="mdi-heart" color="red"></v-icon> by <a
                href="https://www.linkedin.com/in/davide-bulbarelli-2247ba122/">Davide Bulbarelli</a></v-footer>
    </v-app>
</template>
  
<script setup lang="ts">
import { Link } from '~/types/link';
const links: Link[] = [{ name: 'Case', path: '/' }, { name: 'Trasporti', path: '/vehicles' }, { name: 'Cuochi', path: '/chef' }]
const route = useRoute()

function redirect(path: string) {
    navigateTo(path)
}
</script>
<style scoped>
.v-footer {
    white-space: pre;
    justify-content: center;
}
</style>