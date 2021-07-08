import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBF9ZRxl_gTyvFBMbDgA-Bkr4gMBLRRGl8",
  authDomain: "netflix-clone-7f61c.firebaseapp.com",
  projectId: "netflix-clone-7f61c",
  storageBucket: "netflix-clone-7f61c.appspot.com",
  messagingSenderId: "448752251313",
  appId: "1:448752251313:web:583ec35de134294bd04d90",
  measurementId: "G-820CMP8J52"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const auth  = firebase.auth()

export {auth}
export default db