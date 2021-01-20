const withPWA = require('next-pwa')
require('dotenv').config()

module.exports = withPWA({
  env: {
    X_API_KEY: process.env.X_API_KEY,
    MY_SECRET_APP_TOKEN: process.env.MY_SECRET_APP_TOKEN,
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
  },
})
