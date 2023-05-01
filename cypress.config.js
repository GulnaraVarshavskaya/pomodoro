const { defineConfig } = require("cypress");
const deleteProject = require("./cypress/plugins/deleteProject");

module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)

          return null
        },
        async projectCleanup() {
            await deleteProject()
            return null
        }
      })
    },
  },
})
