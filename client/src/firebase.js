// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxLJ5qKhyBropVgqkFeqHmQXaqP8pb63w",
    authDomain: "instabuzz-325f2.firebaseapp.com",
    projectId: "instabuzz-325f2",
    storageBucket: "instabuzz-325f2.appspot.com",
    messagingSenderId: "618820226728",
    appId: "1:618820226728:web:c7af05e3aaa448aef03c9d"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()