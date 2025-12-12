// ============================================
// NEO TOQUIO RP - Firebase Configuration
// ============================================

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBu-Q0FG83_otEV-xGb2y39EmpKAJVe4Q8",
    authDomain: "neo-toquio-rp.firebaseapp.com",
    projectId: "neo-toquio-rp",
    storageBucket: "neo-toquio-rp.firebasestorage.app",
    messagingSenderId: "1069275868480",
    appId: "1:1069275868480:web:1a9e389ffd3326b8bb1ea5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const db = firebase.firestore();
const auth = firebase.auth();

// Enable offline persistence for Firestore
db.enablePersistence()
    .catch((err) => {
        if (err.code === 'failed-precondition') {
            console.log('Persistence failed: Multiple tabs open');
        } else if (err.code === 'unimplemented') {
            console.log('Persistence not available');
        }
    });

console.log('Firebase initialized successfully!');

// Export for use in other files
window.db = db;
window.auth = auth;
window.firebase = firebase;
