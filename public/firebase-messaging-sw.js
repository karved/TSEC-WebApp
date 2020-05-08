// importScripts('https://www.gstatic.com/firebasejs/6.6.2/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/6.6.2/firebase-messaging.js');

// // Initialize the Firebase app in the service worker by passing in the
// // messagingSenderId.
// firebase.initializeApp({
//   'messagingSenderId': '1045382333142'
// });

// const messaging= firebase.messaging();

// messaging.setBackgroundMessageHandler(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);

//   return self.registration.showNotification(payload.data.title, {
//     body: payload.data.body
//   });
// });