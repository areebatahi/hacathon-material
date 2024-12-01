import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import { getFirestore, doc, setDoc} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyCpqc5uGzfeKJu6VUpTwNe2yTA2wrbuOr4",
    authDomain: "signup-login-page-df490.firebaseapp.com",
    projectId: "signup-login-page-df490",
    storageBucket: "signup-login-page-df490.firebasestorage.app",
    messagingSenderId: "852069194561",
    appId: "1:852069194561:web:324d6be2ab459f10619fc0",
    measurementId: "G-HE8YWGEM5G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth, createUserWithEmailAndPassword, db, setDoc, doc
}