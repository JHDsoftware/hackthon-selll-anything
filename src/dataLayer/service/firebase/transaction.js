
import { getDatabase, ref, set, child, push, get, remove  } from "firebase/database";

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
 * @param timestamp
 * @return 
 */
   export function addTran(orderBuyId, orderSellId, userBuyId, userSellId, itemId, status, price, quantity, payment) {
    const db = getDatabase();
    const newTranId = push(child(ref(db), 'transaction')).key;
    set(ref(db, 'transaction/' + newTranId), {
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
  }

  /**
 * 删除transaction
 * @param tranId
 * @return 
 */
   export function removeTran(tranId) {
    const db = getDatabase();
    remove(ref(db, 'transaction/' + tranId));
  }
  
  /**
   * 根据transaction_id查询一个transaction
   * @param tranId
   * @return {Promise<void>}
   */
   export async function getTranOne(tranId) {
      const db = getDatabase();
      const snapshot = await get(ref(db, '/transaction/' + tranId))
      const transaction = snapshot.val();
      return transaction;
  }

  /**
   * 根据item_id查询transactions list
   * @param itemId
   * @param side
   * @return {orders}
   */
   export async function getTransByItem(itemId) {
    const db = getDatabase();
    const transactions = db.collection('transaction').where('item_id','==', itemId).get()
    return transactions;
}

  /**
   * 查询买家用户的多个transactions 
   * @param userid
   * @param status
   * @return {Promise<void>}
   */
   export async function getTransByBuyer(userId, status) {
    const db = getDatabase();
    const trans = db.collection('transaction').where('user_buy_id','==',userId).where('status', '==', status).get()

    return trans;
 }

 /**
   * 查询卖家用户的多个transactions 
   * @param userid
   * @param status
   * @return {Promise<void>}
   */
  export async function getTransBySeller(userId, status) {
    const db = getDatabase();
    const trans = db.collection('transaction').where('user_sell_id','==',userId).where('status', '==', status).get()
    
    return trans;
 }
