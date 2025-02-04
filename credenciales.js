import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'; 
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsMXzZRrm21b6k6FPEMjLK1_ULDF3RWdc",
  authDomain: "gymnasio-719fa.firebaseapp.com",
  projectId: "gymnasio-719fa",
  storageBucket: "gymnasio-719fa.firebasestorage.app",
  messagingSenderId: "103652861670",
  appId: "1:103652861670:web:744b8ba6559e7a3fda7d27",
  measurementId: "G-TMB5GL5EXM"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
// Inicializa la autenticación
const auth = getAuth(appFirebase);

// Inicializa Google Analytics (opcional)
const analytics = getAnalytics(appFirebase); // Solo si necesitas analítica

export { appFirebase, auth, analytics }; // Exporta lo que necesites