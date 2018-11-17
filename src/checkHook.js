const superagent = require('./superagent')

const url = 'https://01fb92a8.ngrok.io/'

async function init (token) {
  const tokenQuery = {
    access_token: token
  }
  const { body: { subscriptions } } = await superagent({
    method: 'get',
    url: 'https://botapi.tamtam.chat/me/subscriptions',
    query: tokenQuery
  })

  console.log(subscriptions)

  const findUrlSubscr = subscriptions.find(elem => elem.url.match(url))
  // console.log('find url in subscr:', findUrlSubscr)
  if (!findUrlSubscr) {
    const subscrRes = await superagent({
      method: 'post',
      url: 'https://botapi.tamtam.chat/me/subscribe',
      query: tokenQuery,
      body: {url}
    })
    console.log('res in sub scr', subscrRes.status)
  }
}

module.exports = init
