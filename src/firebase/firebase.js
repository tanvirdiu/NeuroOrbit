import {
    initializeApp
}
from 'firebase/app'

import {
    getAuth,
    GoogleAuthProvider
}
from 'firebase/auth'

import {
    getFirestore
}
from 'firebase/firestore'


const firebaseConfig = {

    apiKey: "AIzaSyDvccTU7hxGa_PJCOxz1SaT8D0h0sMHDdU",

    authDomain: "neuroorbit-cb3be.firebaseapp.com",

    projectId: "neuroorbit-cb3be",

    storageBucket: "neuroorbit-cb3be.firebasestorage.app",

    messagingSenderId: "693423630686",

    appId: "1:693423630686:web:30523b19c92656fbec47cf",

    measurementId: "G-4GTWT6LKJV"
}


const app =
    initializeApp(firebaseConfig)

export const auth =
    getAuth(app)

export const provider =
    new GoogleAuthProvider()

export default app

export const db =
    getFirestore(app)