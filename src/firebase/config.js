import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDanjqEHSuhJtFTwVUGbhiJ3p_foI2e14E",
  authDomain: "periodico-escolar-16847.firebaseapp.com",
  projectId: "periodico-escolar-16847",
  storageBucket: "periodico-escolar-16847.firebasestorage.app",
  messagingSenderId: "412750185561",
  appId: "1:412750185561:web:ab9bca174571e32e51dd48"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);