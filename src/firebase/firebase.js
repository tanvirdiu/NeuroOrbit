import {
    initializeApp
} from 'firebase/app'

import {
    getAuth,
    GoogleAuthProvider
} from 'firebase/auth'

import {
    getFirestore,
    enableIndexedDbPersistence
} from 'firebase/firestore'



/* =========================
   FIREBASE CONFIG
========================= */

const firebaseConfig = {

    apiKey: "AIzaSyDvccTU7hxGa_PJCOxz1SaT8D0h0sMHDdU",

    authDomain: "neuroorbit-cb3be.firebaseapp.com",

    projectId: "neuroorbit-cb3be",

    storageBucket: "neuroorbit-cb3be.firebasestorage.app",

    messagingSenderId: "693423630686",

    appId: "1:693423630686:web:30523b19c92656fbec47cf",

    measurementId: "G-4GTWT6LKJV"
}



/* =========================
   INITIALIZE APP
========================= */

const app =
    initializeApp(firebaseConfig)



/* =========================
   AUTH
========================= */

export const auth =
    getAuth(app)



/* =========================
   GOOGLE PROVIDER
========================= */

export const googleProvider =
    new GoogleAuthProvider()



/* =========================
   FIRESTORE
========================= */

export const db =
    getFirestore(app)



/* =========================
   OFFLINE PERSISTENCE
========================= */

enableIndexedDbPersistence(db)

.catch((error) => {

    console.log(
        'Firestore Persistence Error:',
        error.message
    )
})



/* =========================
   EXPORT APP
========================= */

export default app