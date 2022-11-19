import {getAnalytics} from 'firebase/analytics'
import firebase from 'firebase/compat/app'
import {login} from '@/dataLayer/service/firebase/user'
import router from '@/router'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage'

import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    OAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithRedirect
} from 'firebase/auth'
import {signInAnonymously} from "@firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBmMy9uqzEpZGR4e16wJj0p9lgb4Bj_wwg",
    authDomain: "hackthon-sell-anything.firebaseapp.com",
    projectId: "hackthon-sell-anything",
    storageBucket: "hackthon-sell-anything.appspot.com",
    messagingSenderId: "166701726898",
    appId: "1:166701726898:web:3a2ae32dcfe1408f469dab",
    measurementId: "G-73KFMZ1EZ6"
};

export const FireBaseApp = firebase.initializeApp(firebaseConfig)
export const Analytics = getAnalytics(FireBaseApp)
export const FireBaseAuth = firebase.auth()
export const FireBaseStorageRef = firebase.storage().ref()
FireBaseAuth.useDeviceLanguage()

FireBaseAuth.onAuthStateChanged(user => {
    if (user?.uid) {
        login(user.uid, user.displayName)
        router.push('/')
    } else {
        router.push('/login')
    }
})

export async function loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    return await signInWithRedirect(FireBaseAuth, provider)
}

export async function loginWithApple() {
    const provider = new OAuthProvider('apple.com')
    return await signInWithRedirect(FireBaseAuth, provider)
}

export async function loginUseGuest() {
    return await signInAnonymously(FireBaseAuth)
}

export async function loginWithEmailAndPassword(email, password) {
    return await signInWithEmailAndPassword(FireBaseAuth, email, password)
}

export async function createUserWithEmail(email, password) {
    return await createUserWithEmailAndPassword(FireBaseAuth, email, password)
}

export async function resetPasswordEmail(email) {
    return await sendPasswordResetEmail(FireBaseAuth, email)
}

export const FireBaseStore = firebase.firestore()

export const GlobalDB = getFirestore(FireBaseApp)

