const functions = require('firebase-functions')
import * as Expo from 'expo-server-sdk'
const admin = require('firebase-admin')
admin.initializeApp()
let expo = new Expo()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.webhookPush = functions.https.onRequest((req, res) => {
  if (req.method !== 'GET') {
    return res.status(403).send('Forbidden!')
  }
  let userId = req.query.id
  let body = JSON.parse(req.body.payload)

  if (req.headers['x-github-event'] === 'issues') {
    const payload = {
      data: {
        action: body.action,
        body: body.sender.login,
        avatar: body.sender.avatar_url,
        repository: body.repository.full_name
      }
    }

    // const root = event.data.ref.root
    let allTokens = []
    let messages = []

    admin.database().ref('/all_user_push_tokens/').once('value', (snapshot) => {
      if (!Expo.isExpoPushToken(snapshot.val())) {
        allTokens.push(snapshot.val())
      } else {
        console.log(snapshot.val())
      }
    })
  .then(() => {
    for (var token in allTokens) {
      messages.push({
        to: token,
        sound: 'default',
        title: 'NXET',
        body: ' NEW ACTIVITIES ADDED!'
      })
    }
  })
  .then(() => {
    let chunks = expo.chunkPushNotifications(messages)

    async (chunks) => {
      for (let chunk of chunks) {
        try {
          await expo.sendPushNotificationsAsync(chunk)
        } catch (error) {
          console.error(error)
        }
      }
    }

    return res.status(200).send('SUCCESS - NOTIFICATIONS SENT!!')
  })
  .catch(() => {
    return res.status(403).send('Forbidden!')
  })
    return res.status(200).send('Function Executing')
  }
})
