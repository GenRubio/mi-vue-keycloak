// src/plugins/keycloak.js
import Keycloak from 'keycloak-js'

let keycloak = null

export function initKeycloak({ onReady }) {
    keycloak = new Keycloak({
        url: 'http://sso:8082',
        realm: 'liferay',
        clientId: 'liferay'
    })

    return keycloak.init({
        onLoad: 'login-required',      // o 'check-sso'
        flow: 'standard',             // Authorization Code + PKCE
        pkceMethod: 'S256',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    }).then(authenticated => {
        if (!authenticated) {
            return Promise.reject('No autenticado')
        }
        // Llamada de callback para notificar que Keycloak ya está listo
        onReady && onReady({ token: keycloak.token, refreshToken: keycloak.refreshToken })
        return keycloak
    })
}

export function getKeycloak() {
    if (!keycloak) throw new Error('Keycloak no inicializado')
    return keycloak
}
