import { doc, setDoc} from 'firebase/firestore'
import {FireBaseAuth, FireBaseStore} from '@/plugins/google-fire-base'
import { getDatabase, ref, set, onValue, update, child, push, get, remove } from "firebase/database";

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
 * @param user_id
 * @param displayName
 * @param email
 * @param password
 * @param balance
 * @param timestamp
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
 * @param user_id
 * @return {Promise<void>}
 * ???auth
 */
 export async function getLoggedInUser(userId) {
    const db = getDatabase();
    const snapshot = await get(ref(db, '/user/' + userId))
    const user = snapshot.val();
    return user;
}

/**
 * 更新用户余额
 * @param user_id
 * @param displayName
 * @param email
 * @param password
 * @param balance
 * @param timestamp
 * @return 
 */
 export function updateUserBalance(userId, balance) {
    const db = getDatabase();
    
    onValue(ref(db, '/user/' + userId), (snapshot) => {
        const user = {
            user_id: userId,
            email: snapshot.val().email,
            password: snapshot.val().password,
            displayName: snapshot.val().displayName,
            timestamp: snapshot.val().timestamp,
            balance: balance,
        }
        const updates = {};
        updates['/user/' + userId] = user;
        update(ref(db), updates)
    }, {
        onlyOnce: true
    });
    
    // const updates = {};
    // updates['/user/' + userId] = user;
    //return update(ref(db), updates);
  }


