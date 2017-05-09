let env = process.env.NODE_ENV || 'development'

const getLock = (options) => {
  const config = require('../config.json')
  const Auth0Lock = require('auth0-lock').default


  
  return new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, options)
}

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`

const getOptions = (container) => {
  return {
    allowedConnections: ['Username-Password-Authentication'],
    container,
    avatar: null,
    closable: false,
    languageDictionary: {
      title: "FontView"
    },
    auth: {
      responseType: 'token id_token',
      domain: 'smbtodos.auth0.com',
      redirectUrl: `${getBaseUrl()}/auth/signed-in`,
      params: {
        scope: 'openid profile email'
      }
    }
  }
}

export const show = (container) => getLock(getOptions(container)).show()
export const logout = () => getLock().logout({ returnTo: getBaseUrl() })
