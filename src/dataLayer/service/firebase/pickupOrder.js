import {collection, deleteDoc, doc, serverTimestamp, setDoc} from "firebase/firestore";
import {GlobalDB} from "@/plugins/google-fire-base";
import {resultOf} from "@/dataLayer/service/firebase/queryUtils";

const path = "pickupOrder"

const defaultPickupOrder = {
    flyToChina: true,
    takeoffDate: "",
    takeoffCity: "",
    landingCity: "",
    smallPackagePrice: 0,
    filePrice: 0,
    appendInfo: "",
    contactInfo: "",
    authed: false,
    deleteAt: "",
    ticketUrl: "",
}

export async function addPickupOrder(flyToChina,
                                     takeoffDate,
                                     takeoffCity,
                                     landingCity,
                                     smallPackagePrice,
                                     filePrice,
                                     appendInfo,
                                     contactInfo,
                                     ticketUrl,) {
    try {
        const newItemId = doc(collection(GlobalDB, path));
        const newItem = Object.assign({
            id: newItemId.id,
            timestamp: serverTimestamp()
        }, defaultPickupOrder, {
            flyToChina,
            takeoffDate,
            takeoffCity,
            landingCity,
            smallPackagePrice,
            filePrice,
            appendInfo,
            contactInfo,
            ticketUrl,
        })
        await setDoc(newItemId, newItem);
        console.log("Document written with ID: ", newItemId.id);
        return newItemId.id
    } catch (e) {
        console.error("Error adding document: ", e);
        return null
    }
}


export async function removePickupOrder(itemId) {
    await deleteDoc(doc(GlobalDB, path, itemId));
}


export async function getPickupOrder() {
    return await resultOf(collection(GlobalDB, path));
}



