import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initKeycloak, getKeycloak } from './plugins/keycloak';

initKeycloak({
    onReady: ({ token, refreshToken }) => {
        // Puedes guardar tokens en un store / Pinia si lo deseas
        console.log('Keycloak listo', { token, refreshToken })
    }
})
    .then(() => {
        const app = createApp(App)

        // Proporciona Keycloak a todos los componentes
        app.provide('keycloak', getKeycloak())

        app.mount('#app')
    })
    .catch(err => {
        console.error('Error inicializando Keycloak:', err)
    })