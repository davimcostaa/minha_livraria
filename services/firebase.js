import { initializeApp, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

let app 

try {

  app = getApp();

} catch (error) {

  const firebaseConfig = {
    apiKey: "AIzaSyDgsa6eoyIgnZVEAL0Ph9tZnaeLdUDzLCA",
    authDomain: "minhalivraria-98841.firebaseapp.com",
    databaseURL: "https://minhalivraria-98841-default-rtdb.firebaseio.com",
    projectId: "minhalivraria-98841",
    storageBucket: "minhalivraria-98841.appspot.com",
    messagingSenderId: "889961762896",
    appId: "1:889961762896:web:3efa775605774072db8155"
  };
  
  app = initializeApp(firebaseConfig);
}

const db = getDatabase(app)

export { db }