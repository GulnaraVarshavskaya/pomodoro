module.exports = (on) => {
    on('task', {
      'db:teardown': () => {
        const teardown = require('./deleteProject')
        return teardown()
      },
    //   'db:seed': () => {
    //     const seed = require('../../db/seed.js')
    //     return seed()
    //   },
    })
  }