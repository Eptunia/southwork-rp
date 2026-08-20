// ============================================================
// CONFIGURATION FIREBASE — SouthCoins RP
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyA82jjA7yG72b7fyYo2voqWjxvM5bHa3x8",
  authDomain: "southcoins-rp.firebaseapp.com",
  projectId: "southcoins-rp",
  storageBucket: "southcoins-rp.firebasestorage.app",
  messagingSenderId: "955982632682",
  appId: "1:955982632682:web:679125eee359da09922993"
};

// Ne touche pas à ce qui suit
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
