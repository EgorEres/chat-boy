const request = require('superagent')

const path = function (path, object) {
  let value = object
  let idx = 0
  while (idx < path.length) {
    if (value === undefined) {
      return
    }
    value = value[path[idx]]
    idx++
  }
  return value
}

module.exports = async function init ({method, url, body, query}) {
  try {
    return await request[method](url)
      .send(body)
      .query(query)
  } catch (error) {
    console.log('[ERROR] in request, method:', method, '\nurl:', url, '\nerror message:', error.message, '\ntext', path(['response', 'error', 'text'], error))
  }
}
