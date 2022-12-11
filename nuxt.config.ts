// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css',],
    build: {
        transpile: ['vuetify'],
    },
    modules: ['@nuxtjs/supabase', '@kevinmarrec/nuxt-pwa'],
    pwa: {
        meta: {
            // Generate splash screens for iOS
            mobileAppIOS: true,
        }
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },
    ssr: true,
    app: {
        buildAssetsDir: '/assets/',
        head: {
            title: 'Case Campi'
        }
    }
})