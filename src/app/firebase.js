


// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth,onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAy0RTEKqU96YZwz5dpocrjYNG4FaXqj7s",
  authDomain: "intranet-nitp.firebaseapp.com",
  projectId: "intranet-nitp",
  storageBucket: "intranet-nitp.appspot.com",
  messagingSenderId: "835813056267",
  appId: "1:835813056267:web:8aa7f5f766efba8f07cc0e",
  measurementId: "G-DMJQ62Z9CQ"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export { auth, provider };
