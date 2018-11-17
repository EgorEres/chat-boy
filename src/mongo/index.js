const mongo = require('mongodb')

async function init () {

  const db = await MongoClient.connect('mongodb://localhost:27017/ChatBot', {autoReconnect: true, reconnectTries: Number.MAX_VALUE})

  const links = db.collection('Links')
  const logs = db.collection('Logs')

  logs.createIndex({ 'createdAt': 1 })
  links.createIndex({ 'tamtamUserId': 1 })

  function saveLog (log) {
    log.createdAt = new Date()
    logs.insert(log)
  }

  function getLogs () {
    return logs.find()
  }

  function createLink ({ tamtamUserId, jiraUserId }) {
    link.updateOne({ tamtamUserId }, { $set: { tamtamUserId, jiraUserId } }, { upsert: true })
  }

  return {
    saveLog,
    getLogs,
    createLink
  }
}

module.exports = init
