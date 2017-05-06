const { setSecret } = './auth'
const uuid = 'uuid'

const getLock = (options) => {
  const config = require('../config.json')
  const Auth0Lock = require('auth0-lock').default
  return new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_CLIENT_DOMAIN, options)
}

exports.getBaseUrl = (req) => {
    const protocal = (req.secure) ? 'https://' : 'http://'
    const host = req.headers.host
    const path = req.route.path
    return protocal + host + path
}

const getOptions = (container) => {
  const secret = uuid.v4()
  setSecret(secret)
  return {
    container,
    closable: false,
    auth: {
      responseType: 'token',
      redirectUrl: `${getBaseUrl()}/auth/signed-in`,
      params: {
        scope: 'openid profile email',
        state: secret
      }
    }
  }
}

// export const show = (container) => getLock(getOptions(container)).show()
// export const logout = () => getLock().logout({ returnTo: getBaseUrl() })