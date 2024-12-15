const Firebase= require('firebase-admin');

const serviceAccount= require('../drive-f0601-firebase-adminsdk-uq0sa-7edc30e908.json');

const firebase=Firebase.initializeApp({
    credential:Firebase.credential.cert(serviceAccount),
    storageBucket:'drive-f0601.firebasestorage.app'
})


module.exports= Firebase;