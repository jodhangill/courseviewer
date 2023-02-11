// Import the functions you need from the SDKs you need

import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-cweLsgrdh8sTik7hcbPC-Ekc6WMR6Rc",
  authDomain: "courseviewer-dbc78.firebaseapp.com",
  projectId: "courseviewer-dbc78",
  storageBucket: "courseviewer-dbc78.appspot.com",
  messagingSenderId: "952978335935",
  appId: "1:952978335935:web:099842ee022592c85bfe0a",
  measurementId: "G-B4G8JSGLL4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addReviews = async (course, dif, rev, prof) => {
    const dbRef = collection(db, course);
    const data = {
        difficulty: dif,
        review: rev,
        prof: prof,
        active: true
     };
    addDoc(dbRef, data)
    .then(docRef => {
        console.log("Document has been added successfully");
    })
    .catch(error => {
        console.log(error);
    })
}

  
export default db;