
import { getDatabase, ref, set, remove } from "firebase/database";

/**
 * 添加tag
 * @param tagName
 * @param timestamp
 * @return 
 */
   export function addTag(tagName) {
    const db = getDatabase();
    const newTagId = push(child(ref(db), 'tag')).key;
    set(ref(db, 'tag/' + newTagId), {
      tag_id: newTagId,
      tag_name: tagName,
      timestamp: Date.now(),
    });
  }

  /**
 * 删除tag
 * @param tagId
 * @return 
 */
   export function removeTag(tagId) {
    const db = getDatabase();
    remove(ref(db, 'tag/' + tagId));
  }
  
