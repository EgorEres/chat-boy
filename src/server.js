const express = require('express')
const bodyParser = require('body-parser')

const app = express()

function init (deps) {
  app.use(bodyParser.json())

  app.listen(3000, () => console.log('Example app listening on port 3000!'))
}

module.exports = init
