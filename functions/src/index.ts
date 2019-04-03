import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Expo from 'expo-server-sdk';


admin.initializeApp();
// Create a new Expo SDK client
let expo = new Expo();

exports.pushNotifications = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(403).send('Forbidden!')
    } else {

      let body = req.body

      if (req.headers['x-github-event'] === 'issues' ||
          req.headers['x-github-event'] === 'issue_comment' ||
          req.headers['x-github-event'] === 'release' || 
          req.headers['x-github-event'] === 'pull_request') {

        const payload = {
          action: body.action,
          name: body.sender.login,
          body: body.issue.body || body.release.name,
          repository: body.repository.name
        }
        let allTokens = [];
        let messages = [];
        await admin.database().ref('/users').once('value', (snapshot) => {
          snapshot.forEach(function (childSnapshot) {
            if (!Expo.isExpoPushToken(childSnapshot.val().push_token)) {
              console.log(childSnapshot.val())
            } else {
              allTokens.push(childSnapshot.val().push_token)
            }
          })
        })
        await allTokens.forEach(function (token) {
          messages.push({
            to: token,
            title: 'New issue ' + payload.action,
            body: 'From: ' + payload.name + ' Body: ' + payload.body + ' In: ' + payload.repository
          })
        })
        console.log(messages)

        let chunks = expo.chunkPushNotifications(messages)
        console.log(chunks)
        for (let chunk of chunks) {
          try {
            await expo.sendPushNotificationsAsync(chunk);
          } catch (error) {
            console.error(error);
          }
        }
        return res.status(200).send(messages)
      }
      return res.status(403).send('Not a github payload')
     
    }
  } catch (error) {
    return res.status(403).send(error)
  }
})