const request = require('./superagent.js')

function narostiJira () {

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

  const auth = {
    login: 'suce',
    pass: '123698741',
    domain: 'isityours.atlassian.net'
  }

  async function createInstruction () {

    const body = {
      fields: {
         project: { key: "TEST" },
         summary: "REST ye merry gentlemen.",
         description: "Creating of an issue using project keys and issue type names using the REST API",
         issuetype: {
            name: "Bug"
         }
      }
    }

    const response = await request({
      method: 'post',
      url: `https://${auth.login}:${auth.pass}@${auth.domain}/rest/api/latest/issue`,
      body
    })

  }

  async function getInstruction (issueNumber) {
  const response = await request({
    method: 'GET',
    uri: `https://${auth.login}:${auth.pass}@${auth.domain}/rest/api/latest/issue/${issueNumber}`,
    resolveWithFullResponse: true
  })

  // console.log('response', response)
  const body = JSON.parse(response.body)
  console.log('body', body)

  return body
  }

  function getAllInstructions () {
  }

  function searchInstructions () {

  }

  function updateInstruction () {
  }

  function deleteInstruction () {
  }

  return {
    createInstruction,
    getInstruction
  }
}

module.exports = narostiJira

const a = narostiJira()
a.createInstruction()
// a.getInstruction('JYSM-1')
