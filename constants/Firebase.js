import Firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAE3yZIDsuniSYaAIJwmuSOuB47m5DI3so',
  authDomain: 'goalsapp-3d2d9.firebaseio.com',
  databaseURL: 'https://goalsapp-3d2d9.firebaseio.com'
};

let app = Firebase.initializeApp(firebaseConfig);

export const db = app.database();