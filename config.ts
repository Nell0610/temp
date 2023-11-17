import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC7rAOjHOCaAxJCqTP64j0SwYx0Vg-g3jk",
    authDomain: "webjam-figmaballz.firebaseapp.com",
    databaseURL: "https://webjam-figmaballz-default-rtdb.firebaseio.com",
    projectId: "webjam-figmaballz",
    storageBucket: "webjam-figmaballz.appspot.com",
    messagingSenderId: "681535489837",
    appId: "1:681535489837:web:0122b1be5aabd0c71f35a4",
    measurementId: "G-KQS6EFD28P"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export {auth, provider, app, db};