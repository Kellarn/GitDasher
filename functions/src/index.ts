import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import Expo from 'expo-server-sdk'


admin.initializeApp()
// Create a new Expo SDK client
const expo = new Expo()

exports. = functions.https.onRequest((req, res) => {
  if (req.method !== 'GET') {
    return res.status(403).send('Forbidden!')
  }

  const allTokens = []
  const messages = []

  admin.database().ref('/all_push_tokens/').once('value', (snapshot) => {
    if (Expo.isExpoPushToken(snapshot.val())) {
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
    const chunks = expo.chunkPushNotifications(messages)

    async (chunks) => {
      for (const chunk of chunks) {
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
})

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
