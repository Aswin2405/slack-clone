import firebase from "firebase"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAembG0ArqVn2wL99crFD-8Nx7ehot83Ug",
    authDomain: "slack-clone-597d7.firebaseapp.com",
    projectId: "slack-clone-597d7",
    storageBucket: "slack-clone-597d7.appspot.com",
    messagingSenderId: "592031442999",
    appId: "1:592031442999:web:ff9d4254fdfaf84da1b7b2",
    measurementId: "G-0374NVNZH5"
  };
  const firebaseApp= firebase.initializeApp(firebaseConfig)
  const db=firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export {auth,provider,db}