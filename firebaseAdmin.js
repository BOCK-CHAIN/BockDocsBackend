// firebaseAdmin.js
const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // or use admin.credential.cert(serviceAccount) if you have a service account json
  });
}

module.exports = admin;
