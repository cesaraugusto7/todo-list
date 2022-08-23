const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_CONFIG))
});


const firestore = getFirestore();

module.exports = firestore;
