import firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

var build = "production";
var firebaseConfig;

// Your web app's Firebase configuration
if (build === "production") {
 // console.log("using production firebase ...");
  firebaseConfig = {
    apiKey: "*****************",
    authDomain: "****************",
    databaseURL: "*******************",
    projectId: "***************",
    storageBucket: "*****************",
    messagingSenderId: "***************",
    appId: "**************************"
  };
} else {
  //console.log("using development firebase ...");
  firebaseConfig = {
    apiKey: "****************",
    authDomain: "*************",
    databaseURL: "*************",
    projectId: "***********",
    storageBucket: "*******************",
    messagingSenderId: "***************",
    appId: "****************************"
  };
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.database();
const storage = firebase.storage();



export { storage, firebase as default };
