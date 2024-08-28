// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTEtO5az03urctkBFwII6s9XYkd8xKWZs",
  authDomain: "quickclinic-346b0.firebaseapp.com",
  projectId: "quickclinic-346b0",
  storageBucket: "quickclinic-346b0.appspot.com",
  messagingSenderId: "331360298561",
  appId: "1:331360298561:web:976dddc5e45d6ec34008c0",
  measurementId: "G-GME5H4CC88"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
