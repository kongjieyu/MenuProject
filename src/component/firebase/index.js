import firebase from 'firebase/app';
import 'firebase/storage';

  var config = {
    apiKey: "AIzaSyDy1ki_h66YL7q0aUi5LGZiwefiR2h27Lc",
    authDomain: "pictureupload-7abac.firebaseapp.com",
    databaseURL: "https://pictureupload-7abac.firebaseio.com",
    projectId: "pictureupload-7abac",
    storageBucket: "pictureupload-7abac.appspot.com",
    messagingSenderId: "177100663269"
  };

  firebase.initializeApp(config);

  const storage = firebase.storage();

  export {
      storage, firebase as default
  }