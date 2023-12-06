const { addXrayResultUpload, configureXrayPlugin } = require("cypress-xray-plugin");
const { defineConfig } = require("cypress");

const fs = require('fs-extra');
const path= require('path')

function getConfigurationByFile(file) {
    const pathfile=path.resolve('cypress/config', `${file}.json`);
    
    if(!fs.existsSync(pathfile)){
      console.log(pathfile)
      return {};
    }
   
  return fs.readJson(pathfile)
}


module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {

      console.log(config.env); // here

      await configureXrayPlugin(config, {
        jira: {
          projectKey: "YAK",
          url: "https://myappyaksha.atlassian.net",
          testPlanIssueKey:"YAK-4",
          testExecutionIssueKey: "YAK-3"
        
        },
        plugin: {
          debug: false,

        },
        xray: {
          uploadResults: true,
          
        },
      });
      await addXrayResultUpload(on);
      const file = config.env.configFile || 'development'
      return getConfigurationByFile(file)
     },
     specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json'
    }

  },
});