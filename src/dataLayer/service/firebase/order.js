import {collection, deleteDoc, doc, orderBy, query, serverTimestamp, setDoc, where} from "firebase/firestore";
import {docContentOf, resultOf} from "@/dataLayer/service/firebase/queryUtils";
import {getCurrentUserId} from "@/dataLayer/service/firebase/user";
import {getOneItem} from "@/dataLayer/service/firebase/item";
import {groupBy, sortBy} from "lodash-es";
import {GlobalDB} from "@/plugins/google-fire-base";
import {addTran} from "@/dataLayer/service/firebase/transaction";

export async function addOrderInternal(itemId, price, quantity, side, type = OperationType.Add) {
    const newOrderId = doc(collection(GlobalDB, "order"));
    await setDoc(newOrderId, {
        order_id: newOrderId.id,
        item_id: itemId,
        price: price,
        quantity: quantity,
        side: side,
        type: type,
        user_id: getCurrentUserId(),
        timestamp: serverTimestamp(),
    });

}

/**
 * 添加order
 * @param itemId
 * @param price
 * @param quantity
 * @param side
 * @return
 */
export async function addOrder(itemId, price, quantity, side) {

    addOrderInternal(itemId, price, quantity, side)
    const isBuy = side === 'buy'
    const sideReverse = (side === 'buy') ? 'sell' : 'buy';
    const operator = (side === 'buy') ? '<=' : '>=';
    const sequence = (side === 'buy') ? 'asc' : 'desc';
    const q = query(collection(GlobalDB, "order"), where("item_id", "==", itemId), where('side', '==', sideReverse), where('price', operator, price), orderBy('price', sequence));
    const items = await resultOf(q);

    const group = Object.values(groupBy(items, (it) => it.user_id + '!!!' + it.price)).map(it => {
        return it.reduce((obj, i) => {
            if (!obj) {
                obj = i
                obj.quantity = 0
            }
            return {
                ...obj, quantity: parseInt(obj.quantity) + parseInt(i.quantity)
            }
        }, null)
    }).filter(it => it.quantity > 0)

    let requiredQuantity = quantity

    for (const record of group) {
        const [buyer, seller] = isBuy ? [getCurrentUserId(), record.user_id] : [record.user_id, getCurrentUserId()]
        const insertQuantity = Math.min(requiredQuantity, record.quantity)
        await addTran(buyer, seller, itemId, record.price, insertQuantity)
        await addOrderInternal(itemId, record.price, -insertQuantity, side, OperationType.FullFilled)
        requiredQuantity -= insertQuantity
        if (requiredQuantity === 0) {
            break
        }
    }


}

export const SideOption = {
    Buy: 'buy', Sell: 'sell'
}

export const OperationType = {
    Add: 'Add', Del: 'Del', FullFilled: 'FullFilled'
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
