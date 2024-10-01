import admin from 'firebase-admin';
import path from 'path';

const serviceAccount = require(path.resolve(__dirname, '../config/stellar-arcadia-332916-firebase-adminsdk-tz6kz-f3ec67a494.json')); 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const auth = admin.auth();
export const firestore = admin.firestore();