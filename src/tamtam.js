const request = require('superagent')

function isValidString (str) {
    if (!str || typeof str !== 'string' || str.length === "" ) {
        return false
    }
    return true
}
function isValidInt (d) {
    if (!d || typeof d !== 'number' || d < 0) {
        return false
    }
    return true
}



class TamTamClient  {
    constructor({ token  } = {}) {
        if (!isValidString(token)) {
            throw new Error('NO TOKEN!!')
        }
        this.url = 'https://botapi.tamtam.chat'
        this.token = token
    }
    sendMessage ({ chatId, text } = {}) {
        // if (!isValidInt(chatId)) {
        //     throw new Error('NO CHAT ID')
        // }
        if (!isValidString(text)) {
            throw new Error("no text1! ")
        }
        return request
            .post(`${this.url}/me/messages`)
            .query({access_token: this.token})
            .send({
                recipient: {chat_id: chatId},
                message: {text}
            })
    }
    getChats ({ count = 100 } = {}) {
        return request
            .get(`${this.url}/me/chats`)
            .query({count, access_token: this.token})
            .then(resp => resp.body.chats)

    }
    getMessages ({ chatId }) {
        // if (!isValidInt(chatId)) {
        //     throw new Error('NO chat id')
        // }

        return request
            .get(`${this.url}/me/messages`)
            .query({chat_id: chatId, access_token: this.token})
            .then(resp => resp.body.messages)
    }


}

module.exports = TamTamClient

//
//  ПРИМЕР ИСПОЛЬЗОВАНИЯ
//
// async function main () {
//     const token = "TUT NADO VVESTI TOKEN"
//     const tamtam =  new TamTamClient({ token })
//     try {
//         const messages = await tamtam.getMessages({ chatId: 68181946763 })
//         const chats = await tamtam.getChats()
//         await tamtam.sendMessage({ chatId: 68181946763, text: 'HELLO'})
//
//     } catch (err) {
//         console.log('err', err)
//     }
//}
//main()
