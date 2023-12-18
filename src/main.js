import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import 'aos/dist/aos.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi'
    }
})

createApp(App).use(vuetify).mount('#app')
