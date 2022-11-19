
import { getDatabase, ref, set, remove } from "firebase/database";

/**
 * 添加item
 * @param itemName
 * @param desc
 * @param imageUrl
 * @param tagId(list)
 * @return 
 */
   export function addItem(itemName, desc, imageUrl, tagId) {
    const db = getDatabase();
    const newItemId = push(child(ref(db), 'item')).key;
    set(ref(db, 'item/' + newItemId), {
      item_id: newItemId,
      item_name: itemName,
      description: desc,
      imageUrl: imageUrl,
      tag_id: tagId,
      timestamp: Date.now(),
    });
  }

  /**
 * 删除item
 * @param itemId
 * @return 
 */
   export function removeItem(itemId) {
    const db = getDatabase();
    remove(ref(db, 'item/' + itemId));
  }
  
  /**
   * 查询一个item
   * @param itemId
   * @return {Promise<void>}
   */
   export async function getItemOne(itemId) {
      const db = getDatabase();
      const snapshot = await get(ref(db, '/item/' + itemId))
      item = snapshot.val();
      return item;
  }

  /**
   * 查询多个item
   * @param tagId
   * @return {Promise<void>}
   */
   export async function getItemsByTag(tagId) {
    const db = getDatabase();
    items = db.collection('item').where('tag_id','array-conctains',tagId).get().then(res => {}).catch(error => {});
    return items;
}