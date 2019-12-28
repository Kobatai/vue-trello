import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC1BddaUpP-jV3MRQslo_3xM0aXR3JpcR0",
  authDomain: "vue-blog-852c7.firebaseapp.com",
  databaseURL: "https://vue-blog-852c7.firebaseio.com",
  projectId: "vue-blog-852c7",
  storageBucket: "vue-blog-852c7.appspot.com",
  messagingSenderId: "189220770256",
  appId: "1:189220770256:web:99949069f9aa84fe0d29d5",
  measurementId: "G-1MTQ20VXJW"
};
// 設定情報でFirebaseライブラリを初期化
firebase.initializeApp(firebaseConfig);

export default firebase;
