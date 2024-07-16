import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDonYnVvTfNQ2iXVuwvjIUfq82WNWvk73I",
  authDomain: "project-m24-e8bd3.firebaseapp.com",
  projectId: "project-m24-e8bd3",
  storageBucket: "project-m24-e8bd3.appspot.com",
  messagingSenderId: "757042244521",
  appId: "1:757042244521:web:01407b60a6358cb06c72b8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const storage = getStorage(app);

export { auth, googleProvider, facebookProvider, storage };
