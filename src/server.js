const express = require('express')
const bodyParser = require('body-parser')
const TamTamClient = require('./tamtam.js')
const superagent = require('./superagent')
const checkHook = require('./checkHook')
const app = express()
const token = 'gGjPsXrHzrM2abI2_1720QVymQNKFokyGINFCf7zbW4'

async function init (deps) {
  app.use(bodyParser.json())

  // Подписываемся на веб-хук
  await checkHook(token)

  const tamtam = new TamTamClient({ token })
  const tokenQuery = {
    access_token: token
  }
  const resUser = await superagent({
    method: 'get',
    url: 'https://botapi.tamtam.chat/me/info',
    query: tokenQuery,
    body: { user_id: 589419470647 }
  })
  console.log('user: ', resUser.body)

  app.post('/', async (req, res) => {
    console.log('it is post res', req.body)
    const { message: {text}, recipient: {chat_id} } = req.body
    if (text && text[0] === '>') {
      const resText = `Я создал задачу: ${text} в JIRA`
      console.log('chat id', chat_id)
      await tamtam.sendMessage({ chatId: chat_id, text: resText })
      // console.log('response send mes ====================>', response.status)
    }
    if (text && text[0] === '~') {
      const resText = `Я создал идею: ${text} в JIRA`
      console.log('chat id', chat_id)
      await tamtam.sendMessage({ chatId: chat_id, text: resText })
      // console.log('response send mes ====================>', response.status)
    }
    res.status(200).send({message: 'OK'})
  })

  app.listen(3000, () => console.log('Example app listening on port 3000!'))
}

module.exports = init
