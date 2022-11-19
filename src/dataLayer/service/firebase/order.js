import {GlobalDB} from "@/dataLayer/service/firebase/database";
import {collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where} from "firebase/firestore";
import {resultOf} from "@/dataLayer/service/firebase/queryUtils";
import {getCurrentUserId} from "@/dataLayer/service/firebase/user";

/**
 * 添加order
 * @param itemId
 * @param price
 * @param quantity
 * @param fulfillQuantity
 * @param side
 * @param userId
 * @return
 */
export async function addOrder(itemId, price,
                               quantity,
                               fulfillQuantity,
                               side, userId) {
    try {
        const newOrderId = doc(collection(GlobalDB, "order"));

        await setDoc(newOrderId, {
            order_id: newOrderId,
            item_id: itemId,
            price: price,
            quantity: quantity,
            fulfilled_quantity: fulfillQuantity,
            side: side,
            user_id: getCurrentUserId(),
            timestamp: serverTimestamp(),
        });
        console.log("Document written with ID: ", newOrderId);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const SideOption = {
    Buy: 'buy',
    Sell: 'sell'
}

/**
 * 删除order
 * @param orderId
 * @return
 */
export async function removeOrder(orderId) {
    await deleteDoc(doc(GlobalDB, "order", orderId));
}

/**
 * 查询orders list
 * @return {Promise<void>}
 */
export async function getOrderList() {
    return await resultOf(collection(GlobalDB, "order"));

}


/**
 * 根据order_id查询一个order
 * @param orderId
 * @return {Promise<void>}
 */
export async function getOrderOne(orderId) {

    const docRef = doc(GlobalDB, "order", orderId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Order data:", docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such order!");
    }
    return docSnap;
}

/**
 * 根据item_id，side(需要相反)查询order list，match用
 * @param itemId
 * @param side
 * @return {orders}
 */
export async function getOrdersByMatch(itemId, side) {
    const q = query(collection(GlobalDB, "order"), where("item_id", "==", itemId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
    return querySnapshot;


    // return db.collection('order').where('item_id', '==', itemId).where('side', '==', side).get();
}

/**
 * 查询一个用户的多个 未完成的(true) 已完成的(false) orders
 * @param userId
 * @param status
 * @return {Promise<void>}
 */
export async function getOrdersByUser(userId, status) {
    return GlobalDB.collection('order').where('user_id', '==', userId).where('status', '==', status).get();
}
