// firebaseAdmin.ts
import admin from 'firebase-admin';

const serviceAccount = require('caminho/para/sua-chave.json'); // Substitua pelo caminho correto

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const auth = admin.auth();
export const firestore = admin.firestore();
