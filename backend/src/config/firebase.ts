import * as admin from "firebase-admin";

const serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com",
});

const auth = admin.auth();
const db = admin.firestore();

export { auth, db };
