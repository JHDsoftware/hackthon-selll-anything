import {GlobalDB} from "@/dataLayer/service/firebase/database";
import {collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where} from "firebase/firestore";
import {docContentOf, resultOf} from "@/dataLayer/service/firebase/queryUtils";
import {getCurrentUserId} from "@/dataLayer/service/firebase/user";
import {getOneItem} from "@/dataLayer/service/firebase/item";

/**
 * 添加order
 * @param itemId
 * @param price
 * @param quantity
 * @param side
 * @return
 */
export async function addOrder(itemId, price, quantity, side) {
    try {
        const newOrderId = doc(collection(GlobalDB, "order"));

        await setDoc(newOrderId, {
            order_id: newOrderId,
            item_id: itemId,
            price: price,
            quantity: quantity,
            fulfilled_quantity: 0,
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
    Buy: 'buy', Sell: 'sell'
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

    return await docContentOf(doc(GlobalDB, "order", orderId));

}

/**
 * 根据item_id，side(需要相反)查询order list，match用
 * @param itemId
 * @param side
 * @return {orders}
 */
export async function getOrderListByMatch(itemId, side) {
    //array
    const orderList = await resultOf(collection(GlobalDB, "order"), where("item_id", "==", itemId), where('side', '==', side));
    const queryOrder = {};
    let totalPrice;
    queryOrder["orderList"] = orderList
    queryOrder["itemInfo"] = await getOneItem(itemId);

    for (let i = 0; i < orderList.length; i++) {
        queryOrder["totalStock"] += orderList[i].quantity;
        queryOrder["minPrice"] = Math.min(queryOrder["minPrice"], orderList[i].price);
        queryOrder["maxPrice"] = Math.max(queryOrder["maxPrice"], orderList[i].price);
        totalPrice += orderList[i].price;
    }
    queryOrder["avgPrice"] = totalPrice / orderList.length;

    for (let i = 0; i < orderList.length; i++) {
        if(orderList[i].price == queryOrder["avgPrice"]){
            queryOrder["meanQuantity"] += orderList[i].quantity;
        }
    }

    return queryOrder;
}

/**
 * 买家给固定的quantity， 想要知道花最少钱的能买到这个固定数量的东西, 根据item_id，
 * @param itemId
 * @param side
 * @return price, quantity(不一定可以买完）
 */
export async function getMinPrice(itemId, quantity) {
    const queryOrder = await getOrderListByMatch(itemId, "sell");

    const minPrice = {};
    if(queryOrder["totalStock"] <= quantity){
        minPrice["quantity"] = quantity;
        for (let i = 0; i < queryOrder["orderList"].length; i++){
            minPrice["price"] += queryOrder["orderList"][i].price * queryOrder["orderList"][i].quantity
        }
        return minPrice;
    }


    for (let i = 0; i < orderList.length; i++) {

    }

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
