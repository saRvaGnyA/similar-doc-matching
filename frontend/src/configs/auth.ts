export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'userData',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
