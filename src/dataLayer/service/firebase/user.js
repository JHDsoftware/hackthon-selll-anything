import { doc, setDoc} from 'firebase/firestore'
import {FireBaseAuth, FireBaseStore} from '@/plugins/google-fire-base'

const userDBPath = 'user'

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

