// Configuration for qauto.forstudy.space
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space',
    // retries: {
    //   runMode: 2,
    //   openMode: 0,
    // },
  },
  defaultCommandTimeout: 5000,
  video: false,
  trashAssetsBeforeRuns: true,
  env: {
    AUTH_USERNAME: 'pravdenko2001@gmail.com',
    AUTH_PASSWORD: 'Test12345!',
  },
});
