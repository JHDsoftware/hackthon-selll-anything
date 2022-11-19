import {child, get, getDatabase, push, ref, remove, set} from "firebase/database";
import {GlobalDB} from "@/dataLayer/service/firebase/database";

/**
 * 添加order
 * @param itemId
 * @param priceLow
 * @param priceHigh
 * @param quantity
 * @param fulfillQuantity
 * @param status(boolean)
 * @param side
 * @param userId
 * @param payment
 * @return
 */
export function addOrder(itemId, priceLow, priceHigh,
                         quantity, fulfillQuantity, status, side, userId, payment) {
    const db = getDatabase();
    const newOrderId = push(child(ref(db), 'order')).key;
    set(ref(db, 'order/' + newOrderId), {
        order_id: newOrderId,
        item_id: itemId,
        price_low: priceLow,
        priceHigh: priceHigh,
        quantity: quantity,
        fulfilled_quantity: fulfillQuantity,
        side: side,
        user_id: userId,
        status: status,
        payment: payment,
        timestamp: Date.now(),
    });
}

/**
 * 删除order
 * @param orderId
 * @return
 */
export function removeOrder(orderId) {
    const db = getDatabase();
    remove(ref(db, 'order/' + orderId));
}

/**
 * 根据order_id查询一个order
 * @param orderId
 * @return {Promise<void>}
 */
export async function getOrderOne(orderId) {
    const db = getDatabase();
    const snapshot = await get(ref(db, '/order/' + orderId))
    return snapshot.val();
}

/**
 * 根据item_id，side(需要相反)查询order list，match用
 * @param itemId
 * @param side
 * @return {orders}
 */
export async function getOrdersByMatch(itemId, side) {
    const db = getDatabase();
    return db.collection('order').where('item_id', '==', itemId).where('side', '==', side).get();
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
