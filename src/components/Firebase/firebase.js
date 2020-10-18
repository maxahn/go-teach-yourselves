import app from 'firebase/app';
import 'firebase/auth';
// import 'firebase/firestore';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    // this.fieldValue = app.firestore.FieldValue;
    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, pw) => {
    let { auth } = this;
    return this.auth.createUserWithEmailAndPassword(email, pw);
  }

  doSignInWithEmailAndPassword = (email, pw) => {
    return this.auth.signInWithEmailAndPassword(email, pw);
  }

  doSignOut = () => this.auth.signOut();

  // API

  course = cid => this.db.ref(`courses/${cid}`);
  courses = () => this.db.ref(`courses`);

  questions = () => this.db.ref(`Questions`);
  // FIREBASE
  // course = cid => this.db.doc(`classes/${cid}`);
  // courses = () => this.db.collection('classes');

  // getCourses = () => {
  //   return this.db.collection("classes").get()
  //   .then(function(querySnapshot) {
  //     const classArray = [];
  //     querySnapshot.forEach(function(doc) {
  //         classArray.push({
  //           id: doc.id,
  //           ...doc.data()
  //         });
  //         console.log(doc.id, " => ", doc.data());
  //     });
  //     return classArray;
  //   })
  //   .catch(function(error) {
  //       console.log("Error getting documents: ", error);
  //   });
  // }
}

export default Firebase;