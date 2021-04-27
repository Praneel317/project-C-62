import firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyDJgbf7HxlTYSaA9uYRtzmJ3x-9ZZ9DwTw",
  authDomain: "attendance-f2abf.firebaseapp.com",
  databaseURL: "https://attendance-f2abf-default-rtdb.firebaseio.com",
  projectId: "attendance-f2abf",
  storageBucket: "attendance-f2abf.appspot.com",
  messagingSenderId: "7790017745",
  appId: "1:7790017745:web:66cd3ac7d877d7c61819f0"

  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.database();
