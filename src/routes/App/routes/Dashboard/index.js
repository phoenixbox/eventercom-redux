export default (store) => ({
  path : 'dashboard',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Dashboard = require('./components/Dashboard').default

      cb(null, Dashboard)
    }, 'dashboard')
  }
})
