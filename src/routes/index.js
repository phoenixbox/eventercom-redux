// We only need to import the modules necessary for initial render
import Core from '../layouts/Core/Core'
import Home from './Home'
import App from './App'
import NotFound from './NotFound'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : Core,
  indexRoute  : Home,
  notFoundRoute: Home,
  childRoutes : [
    App(store),
    NotFound(store)
  ]
})

export default createRoutes
