const request = require('./superagent.js')

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

function narostiJira (dependencies) {

  async function  getSettings (domain) {
    const response = await request({
      method: 'get',
      url: `https://${auth.login}:${auth.pass}@${domain}/rest/api/latest/issue/createmeta`
    })

    const text = path (['body'], response)
    console.log('response', text)

    return text
  }

  async function createInstruction ({ projectKey, issueType, name }) {
    // Есть ещё доп поля
    let body = {
      fields: {
        summary: name,
        project: { key: projectKey },
        issuetype: { name: issueType }
      }
    }

    const response = await request({
      method: 'post',
      url: `https://${auth.login}:${auth.pass}@${auth.domain}/rest/api/latest/issue/`,
      body
    })

    console.log('response', response)
  }

  async function readInstruction (issueNumber) {
  const response = await request({
    method: 'get',
    url: `https://${auth.login}:${auth.pass}@${auth.domain}/rest/api/latest/issue/${issueNumber}`
  })

  const body = path(['body', 'fields', 'issuetype'], response)

  // console.log('response', response)
  console.log('body', body)

  return body
  }

  async function searchInstructions (query) {
    const response = await request({
      method: 'get',
      url: `https://${auth.login}:${auth.pass}@${auth.domain}/rest/api/latest/search`,
      query
    })

    const text = path (['body'], response)
    console.log('response', text)

    return text
  }

  async function updateInstruction ({ issueNumber, query }) {
    const body = {
      fields: query
    }

    const response = await request({
      method: 'put',
      url: `https://${auth.login}:${auth.pass}@${auth.domain}/rest/api/latest/issue/${issueNumber}`,
      body
    })
  }

  async function deleteInstruction(issueNumber) {
    await request({
      method: 'delete',
      url: `https://${auth.login}:${auth.pass}@${auth.domain}/rest/api/latest/issue/${issueNumber}`
    })
  }

  return {
    createInstruction,
    readInstruction,
    updateInstruction,
    deleteInstruction,
    searchInstructions,
    getSettings
  }
}

module.exports = narostiJira
