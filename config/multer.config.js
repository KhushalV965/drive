const multer= require('multer');
const firebasestorage= require('multer-firebase-storage');
const firebase= require('./firebase.config');
const serviceAccount= require('../drive-f0601-firebase-adminsdk-uq0sa-7edc30e908.json');
const { credential } = require('firebase-admin');


const storage = firebasestorage({
    credentials: firebase.credential.cert(serviceAccount),
    bucketName:'drive-f0601.firebasestorage.app'
});


const upload= multer({
    storage:storage,
});

module.exports=upload;

