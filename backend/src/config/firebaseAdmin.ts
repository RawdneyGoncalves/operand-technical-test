import admin from 'firebase-admin';
import path from 'path';

const serviceAccount = require(path.resolve(__dirname, '../config/stellar-arcadia-332916-firebase-adminsdk-tz6kz-f3ec67a494.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
    projectId: serviceAccount.project_id,
});

export const auth = admin.auth();
export const firestore = admin.firestore();
