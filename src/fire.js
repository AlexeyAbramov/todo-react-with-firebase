import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBP4FoOr_eB_cholz-C_Ggvw59YygsT0LU",
  authDomain: "todo-react-fec8c.firebaseapp.com",
  projectId: "todo-react-fec8c",
  storageBucket: "todo-react-fec8c.appspot.com",
  messagingSenderId: "547977145058",
  appId: "1:547977145058:web:152d29b7f48eb6ed5fccbb",
};
const fireApp = firebase.initializeApp(firebaseConfig);

export default fireApp;
