const config = require('../config.json')
const Auth0Lock = require('auth0-lock').default
import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'
import Router from 'next/router'

export default class Auth0 {

  constructor(saveUser) {

    this.options = {
      allowedConnections: ['Username-Password-Authentication'],
      container: 'put-lock-here',
      closable: false,
      auth: {
        responseType: 'token id_token',
        domain: 'smbtodos.auth0.com',
        params: {
          scope: 'openid profile email'
        }
      }
    }
    this.user = {}
    this.auth0
    this.lock
    this.saveUser = saveUser //Redux action
  }

  show() {
    this.auth0.show()
  }

  init() {
    this.auth0 = new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_CLIENT_DOMAIN, this.options)
  }

  login() {
    this.init()
    this.createLockEvent()
    this.show()
  }

  createLockEvent() {
    return this.auth0.on("authenticated", (authResult) => {
      this.auth0.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          // Handle error
          return;
        }

        // console.log('authenticated')
        // console.log(authResult);
        // console.log(profile)

        //create user
        const user = {
          token: authResult.idToken,
          email: profile.email,
          email_verified: profile.email_verified,
          picture: profile.picture,
          user_id: profile.user_id,
          exp: authResult.idTokenPayload.exp
        }

        // Set Tokens
        window.localStorage.setItem('token', user.token)
        window.localStorage.setItem('user', JSON.stringify(jwtDecode(user.token)))
        Cookie.set('jwt', user.token)

        // Save user in redux
        this.saveUser(user)
        // Move page
        Router.push('/celeb-jokes')
      });
    });
  }

  static getBaseUrl = () => `${window.location.protocol}//${window.location.host}`

  static logout(url){
    console.log('logout')
    Auth0.getLock().logout({returnTo: Auth0.getBaseUrl()})
  }

  static getLock(){
    return new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_CLIENT_DOMAIN)
  }

}