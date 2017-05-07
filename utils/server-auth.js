const jwtDecode = require('jwt-decode')
const Cookie = require('js-cookie')


exports.getUserFromCookie = (req) => {
  
  if (!req.headers.cookie) {
    return undefined
  }
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
  if (!jwtCookie) {
    return undefined
  }
  const jwt = jwtCookie.split('=')[1]
  return jwt
}