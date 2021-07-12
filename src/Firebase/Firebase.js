import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAM2E1U6VCtAHF9CPUyUpwWxAtAcQnFo-w",
    authDomain: "ecommerce-6d2aa.firebaseapp.com",
    projectId: "ecommerce-6d2aa",
    storageBucket: "ecommerce-6d2aa.appspot.com",
    messagingSenderId: "1019721923706",
    appId: "1:1019721923706:web:d073245065a23ebdd5cfc3"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

  const store = firebase.firestore();
  const auth = firebase.auth();

  export const createUserDocument = async (user,additionalData) => {
    if(!user) return;

    const useRef = store.doc(`users/${user.uid}`);

    const snapshot = await useRef.get();

    if(!snapshot.exists)
    {
      const {username} = additionalData;
      try{
          useRef.set({
            username,
            createdAt: new Date(),
          })
      }
      catch(error)
      {
        console.log("There is an error in creating a new user",error);
      }
    }
  }

  export { store , auth }