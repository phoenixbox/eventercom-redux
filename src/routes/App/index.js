export default (store) => ({
  path : 'a',

  getChildRoutes (partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Dashboard').default(store)
      ])
    })
  },

  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const App = require('./components/App').default

      cb(null, App)
    }, 'a')
  }
})
