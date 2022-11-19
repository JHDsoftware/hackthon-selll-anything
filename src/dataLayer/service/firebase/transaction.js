import {collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where} from "firebase/firestore";
import {GlobalDB} from "@/dataLayer/service/firebase/database";

/**
 * 添加transaction
 * @param orderSellId
 * @param orderBuyId
 * @param userSellId
 * @param userBuyId
 * @param itemId
 * @param status(boolean)
 * @param price
 * @param quantity
 * @param payment
 * @return
 */
export async function addTran(orderBuyId, orderSellId, userBuyId, userSellId, itemId, status, price, quantity, payment) {
    try {
        const newTranId = doc(collection(GlobalDB, "transaction"));

        await setDoc(newTranId, {
            transaction_id: newTranId,
            order_buy_id: orderBuyId,
            order_sell_id: orderSellId,
            user_sell_id: userSellId,
            user_buy_id: userBuyId,
            item_id: itemId,
            price: price,
            quantity: quantity,
            status: status,
            payment: payment,
            timestamp: Date.now(),
        });
        console.log("Document written with ID: ", newTranId);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

/**
 * 删除transaction
 * @param tranId
 * @return
 */
export async function removeTran(tranId) {

    await deleteDoc(doc(GlobalDB, "transaction", tranId));

}

/**
 * 根据transaction_id查询一个transaction
 * @param tranId
 * @return {Promise<void>}
 */
export async function getTranOne(tranId) {
    const docRef = doc(GlobalDB, "transaction", tranId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    return docSnap;
}

/**
 * 根据item_id查询transactions list
 * @param itemId
 * @param side
 * @return {orders}
 */
export async function getTransByItem(itemId) {
    const q = query(collection(GlobalDB, "transaction"), where("item_id", "==", itemId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
    return querySnapshot;
}

/**
 * 查询买家用户的多个transactions
 * @param userid
 * @param status
 * @return {Promise<void>}
 */
export async function getTransByBuyer(userId, status) {
    const q = query(collection(GlobalDB, "transaction"), where("user_id", "==", userId), where('status', '==', status));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
    return querySnapshot;

}

/**
 * 查询卖家用户的多个transactions
 * @param userid
 * @param status
 * @return {Promise<void>}
 */
export async function getTransBySeller(userId, status) {
    const q = query(collection(GlobalDB, "transaction"), where("user_sell_id", "==", userId), where('status', '==', status));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
    return querySnapshot;

}
