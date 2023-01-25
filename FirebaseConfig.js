import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDEhPx4iMbjtpldTwmxqYWvWUaXd8ROcE4",
  authDomain: "sul-construtora.firebaseapp.com",
  projectId: "sul-construtora",
  storageBucket: "sul-construtora.appspot.com",
  messagingSenderId: "1034858903440",
  appId: "1:1034858903440:web:08029b00427ad6a5dca515",
  measurementId: "G-4E05JJKYDL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);