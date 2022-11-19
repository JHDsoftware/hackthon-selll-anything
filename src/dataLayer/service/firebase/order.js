import {GlobalDB} from "@/dataLayer/service/firebase/database";
import {collection, deleteDoc, doc, serverTimestamp, setDoc, where} from "firebase/firestore";
import {docContentOf, resultOf} from "@/dataLayer/service/firebase/queryUtils";
import {getCurrentUserId} from "@/dataLayer/service/firebase/user";
import {getOneItem} from "@/dataLayer/service/firebase/item";
import {sortBy} from "lodash-es";

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
export async function getItemDetail(itemId, side) {
    //array
    const orderList = await resultOf(collection(GlobalDB, "order"), where("item_id", "==", itemId), where('side', '==', side));
    const minPrice = Math.min(...orderList.map(it => it.price))
    return {
        ...(await getOneItem(itemId)),
        orderList,
        totalStock: orderList.reduce((sum, i) => sum + i.quantity, 0),
        minPrice,
        maxPrice: Math.max(...orderList.map(it => it.price)),
        avgPrice: orderList.reduce((sum, i) => sum + i.price, 0) / orderList.length,
        minCount: orderList.filter(it => it.price === minPrice).reduce((sum, i) => sum + i.quantity, 0)
    };
}

/**
 * 买家给固定的quantity， 想要知道花最少钱的能买到这个固定数量的东西, 根据item_id，
 * @param itemId
 * @param quantity
 * @return price, quantity(不一定可以买完）
 */
export async function getMinPrice(itemId, quantity) {
    const itemDetail = await getItemDetail(itemId, "sell");

    let price = 0;
    let count = 0;

    if (itemDetail.totalStock <= quantity) {
        count = itemDetail.totalStock
        price = itemDetail.maxPrice
    } else {
        const arr = itemDetail.orderList
        sortBy(arr, 'price')

        for (const order of arr) {
            if (count < quantity) {
                count += order.quantity
            } else {
                price = order.price
                count = -1
                break;
            }
        }

    }
    return {
        count, price
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
