import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG_I3lMgPkVtHhJyz5EywZMqVdeY7kAOY",
  authDomain: "omsaigroceries-app.firebaseapp.com",
  projectId: "omsaigroceries-app",
  storageBucket: "omsaigroceries-app.appspot.com",
  messagingSenderId: "546616992684",
  appId: "1:546616992684:web:5981a312365a0cd5961009",
};

// Initialize Firebase app...
const app = initializeApp(firebaseConfig);

// subscribing firebase services...
const db = getFirestore(app);
const auth = getAuth(app);

// collection reference
const colRef = collection(db, "products");

// auth provider
const provider = new GoogleAuthProvider();

// forcing authProvider to give options to select gmail a/c
// provider.setCustomParameters({ prompt: "select_account" });

export default colRef;
export { provider, auth, db };
