import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBkwn5ZwnBbQmTAdMUdK4V_cmpx3v7nu-U",
    authDomain: "crud-users-76410.firebaseapp.com",
    projectId: "crud-users-76410",
    storageBucket: "crud-users-76410.appspot.com",
    messagingSenderId: "942537423300",
    appId: "1:942537423300:web:f66c4ac58b86cba82ecc91"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

/**
 * @param {string} name the name of this person
 * @param {string} lastname the last name of this person
 * @param {string} position position in the company
 * @param {string} description the description of the personal
 */
export const saveTask = (name, lastname, position, description) =>
  addDoc(collection(db, "tasks"), {name, lastname, position , description });

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

/**
 * @param {string} id Task ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

export const getTasks = () => getDocs(collection(db, "tasks"));
