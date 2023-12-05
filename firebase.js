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
    credential:applicationDefault(
      {
        "type": process.env.TYPE,
        "project_id": process.env.PROJECT_ID,
        "private_key_id": process.env.PRIVATE_KEY_ID,
        "private_key": process.env.PRIVATE_KEY,
        "client_email": process.env.CLIENT_EMAIL,
        "client_id": process.env.CLIENT_ID,
        "auth_uri": process.env.AUTH_URI,
        "token_uri": process.env.TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
        "universe_domain":process.env.UNIVERSE_DOMAIN
      
    })
})

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