import { getFirestore } from "firebase/firestore";
import { FireBaseApp } from "@/plugins/google-fire-base";

// TODO: Any Config?
// See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//     // ...
// };

export const GlobalDB = getFirestore(FireBaseApp)





