require('dotenv').config()

module.exports = {
  env: {
    X_API_KEY: process.env.X_API_KEY,
    MY_SECRET_APP_TOKEN: process.env.MY_SECRET_APP_TOKEN,
  },
}
