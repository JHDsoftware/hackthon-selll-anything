import {collection, deleteDoc, doc, query, serverTimestamp, setDoc, where} from "firebase/firestore"
import {GlobalDB} from "@/plugins/google-fire-base"
import {docContentOf, resultOf} from "@/dataLayer/service/firebase/queryUtils"
import {getCurrentUserId} from "@/dataLayer/service/firebase/user"
import {getMyPayments} from "@/dataLayer/service/firebase/payment"

export const pickupOrderPath = "pickupOrder"

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

export async function addPickupOrder(flyToChina, takeoffDate, takeoffCity, landingCity, smallPackagePrice, filePrice,
                                     appendInfo, contactInfo, ticketUrl,) {
    try {
        const newItemId = doc(collection(GlobalDB, pickupOrderPath))
        const newItem = Object.assign({
            id: newItemId.id, timestamp: serverTimestamp(), userId: getCurrentUserId(),
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
        await setDoc(newItemId, newItem)
        console.log("Document written with ID: ", newItemId.id)
        return newItemId.id
    } catch (e) {
        console.error("Error adding document: ", e)
        return null
    }
}

export async function getMyOrders() {
    return await resultOf(query(
        collection(GlobalDB, pickupOrderPath),
        where("userId", "==", getCurrentUserId())))
}

export async function getMyPurchasedOrders() {
    const payments = await getMyPayments()
    return (await Promise.allSettled(payments.map(async it =>
        await docContentOf(doc(GlobalDB, pickupOrderPath, it.pickupOrderId))))).map(it=>it.value)

}


export async function removePickupOrder(itemId) {
    await deleteDoc(doc(GlobalDB, pickupOrderPath, itemId))
}


export async function getPickupOrder() {
    return await resultOf(collection(GlobalDB, pickupOrderPath))
}



