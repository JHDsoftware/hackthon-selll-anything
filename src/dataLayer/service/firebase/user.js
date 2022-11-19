import {doc, setDoc} from 'firebase/firestore'
import {FireBaseAuth, FireBaseStore} from '@/plugins/google-fire-base'
import {child, get, getDatabase, push, ref, remove, set, update} from "firebase/database";

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

export function getCurrentUser() {
    return FireBaseAuth.currentUser
}

/**
 * 添加用户
 * @param name
 * @param email
 * @param psw
 * @param balance
 * @return
 */
export function writeUserData(name, email, psw, balance) {
    const db = getDatabase();
    const newUserId = push(child(ref(db), 'user')).key;
    set(ref(db, 'user/' + newUserId), {
        user_id: newUserId,
        displayName: name,
        email: email,
        password: psw,
        balance: balance,
        timestamp: Date.now(),
    });
}

/**
 * 删除user
 * @param userId
 * @return
 */
export function removeItem(userId) {
    const db = getDatabase();
    remove(ref(db, 'user/' + userId));
}

/**
 * 查询用户
 * @return {Promise<void>}
 * ???auth
 * @param userId
 */
export async function getLoggedInUser(userId) {
    const db = getDatabase();
    const snapshot = await get(ref(db, '/user/' + userId))
    return snapshot.val();
}

/**
 * 更新用户余额
 * @param userId
 * @param balance
 * @return
 */
export async function updateUserBalance(userId, balance) {
    const db = getDatabase();
    const user = (await get(ref(db, '/user/' + userId))).val()
    const updates = {}
    updates['/user/' + userId] = {
        user_id: userId,
        email: user.email,
        password: user.password,
        displayName: user.displayName,
        timestamp: user.timestamp,
        balance: balance,
    }
    update(ref(db), updates)
}


