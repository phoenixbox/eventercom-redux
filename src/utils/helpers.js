import _ from 'lodash'
const DEFAULT_ERROR_MESSAGE = 'Oops there was an error!'
const UNPROCESSABLE = 'Unprocessable Entity'

export default {
  /*
  * The rails error response.body should be standardized through the API
  */
  noteMessage (note = {}) {
    let status = note.status || note.statusCode || ''
    let message = note.message || DEFAULT_ERROR_MESSAGE
    const genericMessage = _.get(note, 'response.body.message')
    if (genericMessage) {
      message = genericMessage
    }

    let flashMessage =
    _.get(note, 'response.body.details.flash') ||
    _.get(note, 'details.flash')

    if (note.text) {
      try {
        const parsed = JSON.parse(note.text)
        if (parsed) {
          flashMessage = parsed.errors[0].title
        }
      } catch (e) {}
    }

    if (flashMessage) {
      message = flashMessage
      if (flashMessage === UNPROCESSABLE) {
        message = DEFAULT_ERROR_MESSAGE
      }
    }

    const dataFlashMessage =
    _.get(note, 'response.body.details.data.flash') ||
    _.get(note, 'details.data.flash')

    if (dataFlashMessage) {
      message = dataFlashMessage
    }

    let resultNote = {
      status,
      autoClose: true,
      message: _.upperFirst(message)
    }
    let controlKeys = _.pick(note, ['size', 'autoClose'])

    _.assign(resultNote, controlKeys)
    if (!resultNote.status && _.isError(note)) {
      resultNote.status = 400
    }

    if (new RegExp(/network is offline/).test(resultNote.message)) {
      resultNote.message = 'The request failed, please check your network connection.'
    }

    return resultNote
  },
  /*
  1: 'success',
  2: 'warning'
  3: 'error'
  4: 'info'
  */
  notieErrorCodeFromStatus (status) {
    let notieCode = 4
    if (typeof status !== 'undefined') {
      const codeRange = `${status}`.charAt(0)
      const notieMap = {
        2: 1,
        3: 2,
        4: 3,
        5: 3
      }

      notieCode = notieMap[codeRange] || notieCode
    }

    return notieCode
  },
  notesFromReducerState (state) {
    const appState = _.omit(state, 'location')

    return _.chain(appState)
    .reduce((memo, val, key) => {
      const note = val.toJS().note
      if (note) {
        const notification = {
          reducer: key,
          note
        }
        memo.push(notification)
      }
      return memo
    }, [])
    .value()
  }
}
