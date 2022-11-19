import {getDatabase} from "firebase/database";
import {FireBaseApp} from "@/plugins/google-fire-base";

export const GlobalDB = getDatabase(FireBaseApp)
