// Configuration for qauto2.forstudy.space
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space',
    // retries: {
    //   runMode: 2,
    //   openMode: 0,
    // },
  },
  defaultCommandTimeout: 5000,
  video: false,
  trashAssetsBeforeRuns: true,
  env: {
    AUTH_USERNAME: 'pravdenkonelia@gmail.com',
    AUTH_PASSWORD: 'Test123!',
  },
});
