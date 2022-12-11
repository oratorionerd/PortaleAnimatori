// plugins/vuetify.js
import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
    const festantonioTheme: ThemeDefinition = {
        dark: false,
        colors: {
            background: '#FFFFFF',
            surface: '#FFFFFF',
            primary: '#F29A2E',
            'primary-darken-1': '#DB831F',
            secondary: '#F21B6A',
            'secondary-darken-1': '#DB150D',
            error: '#F93A0F',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00',
        }
    }
    const vuetify = createVuetify({
        components,
        directives,
        ssr: true,
        theme: {
            defaultTheme: 'festantonioTheme',
            themes: {
                festantonioTheme
            }
        }
    })

    nuxtApp.vueApp.use(vuetify)
})
