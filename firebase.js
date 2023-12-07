require('dotenv').config();

const {initializeApp, applicationDefault} = require("firebase-admin/app");
const {getFirestore}=require('firebase-admin/firestore')
const {initializeApp: initializeAppClient}= require('firebase/app')
const { getAuth, signInWithEmailAndPassword,signOut }=require("firebase/auth");
const {
getStorage,
  collection,
  getDocs,
  addDoc,
  getDownloadURL,
  uploadBytes,ref,
  uploadBytesResumable
} =require("firebase/storage");

const app=initializeApp({
    credential:applicationDefault()
})
process.env.GOOGLE_APPLICATION_CREDENTIALS;
//config para la api de cliente
const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINSENDERID,
    appId: process.env.APPID,
  };
  
const appClient=initializeAppClient(firebaseConfig)
const db=getFirestore()
const st = getStorage(appClient);
const auth=getAuth(appClient);
module.exports = {
    db,
    st,
    collection,
    getDocs,
    addDoc,
    getDownloadURL,uploadBytes,
    ref,uploadBytesResumable,
    auth,signInWithEmailAndPassword,signOut
}