import { collection, getDoc, getDocs, doc, setDoc, deleteDoc, serverTimestamp, query, where } from "firebase/firestore";
import {GlobalDB} from "@/dataLayer/service/firebase/database";

/**
 * 添加item
 * @param itemName
 * @param desc
 * @param imageUrl
 * @param tagId(list)
 * @return
 */
export async function addItem(itemName, desc, imageUrl, tagId) {
    try {
        const newItemId = doc(collection(GlobalDB, "item"));

        await setDoc(newItemId,{
            item_id: newItemId,
            item_name: itemName,
            description: desc,
            imageUrl: imageUrl,
            tag_id: tagId,
            timestamp: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

/**
 * 删除item
 * @param itemId
 * @return
 */
export async function removeItem(itemId) {

    await deleteDoc(doc(GlobalDB, "item", itemId));

}

/**
 * 查询items list
 * @return {Promise<void>}
 */
export async function getItems() {
    const querySnapshot = await getDocs(collection(GlobalDB, "item"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });

    return querySnapshot;
}

/**
 * 查询单个item
 * @param itemId
 * @return {Promise<void>}
 */
export async function getOneItem(itemId) {
    const docRef = doc(GlobalDB, "item", itemId);
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
 * 查询单个item by tag
 * @param tagId
 * @return {Promise<void>}
 */
export async function getItemsByTag(tagId) {
    const q = query(collection(GlobalDB, "item"), where("tag_id", "==", tagId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
    return querySnapshot;
}


