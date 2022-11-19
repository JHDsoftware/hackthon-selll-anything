import {doc, setDoc} from 'firebase/firestore'
import {FireBaseAuth, FireBaseStore} from '@/plugins/google-fire-base'
import { getDatabase, ref, set } from "firebase/database";

const userDBPath = 'users'

/**
 * 注意！！请只在FireBase提供的Hook中调用本函数
 * @param id
 * @param displayName
 * @return {Promise<void>}
 */
export async function login(id, displayName) {
    await setDoc(doc(FireBaseStore, userDBPath, id), {id, displayName})
}


export function getCurrentUserId() {
    return FireBaseAuth.currentUser?.uid
}

<<<<<<< HEAD
export function getCurrentUser() {
    return FireBaseAuth.currentUser
}


=======
export function writeUserData(userId, name, email, psw) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    password: psw,
  });
}

>>>>>>> 008d456 (add firebase)
