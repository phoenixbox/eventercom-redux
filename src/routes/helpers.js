export function authedRoute (store) {
  return (nextState, replace, callback) => {
    const reducers = store.getState()
    const user = reducers.user.get('data').toJS()

    if (user.id && !user.uuid) {
      replace('/a/dashboard')
    }
    callback()
  }
}
const ROLES = [
  'reader',
  'writer',
  'admin',
  'owner',
  'super'
]
export function roleRoute (store, role) {
  return (nextState, replace, callback) => {
    const reducers = store.getState()
    const user = reducers.user.get('data').toJS()
    const authed = ROLES.indexOf(user.role) >= ROLES.indexOf(role)

    if (!authed) {
      replace('/a/dashboard')
    }
    callback()
  }
}
