const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
    setupNodeEvents(on, config) {
      require('@shelex/cypress-allure-plugin/writer')(on, config);
      return config;
    },
    baseUrl: "http://localhost:3000/",
    env: {
      adminEmail: 'admin@biblioteca.com',
      adminSenha: 'admin123',
      allure: true
    },
    projectId: "wtac4c",
    video: false
  },
});
