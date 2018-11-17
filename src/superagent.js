const request = require('superagent')

module.exports = async function init ({method, url, body, query}) {
  try {
    return await request[method](url)
      .send(body)
      .query(query)
  } catch (error) {
    console.log('[ERROR] in request, method:', method, '\nurl:', url, '\nerror message:', error.message)
  }
}
