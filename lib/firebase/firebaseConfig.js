import { initializeApp } from "firebase/app";
import { getRequiredEnvVar } from "@/lib/getEnv"

const firebaseConfig = {
    apiKey: getRequiredEnvVar("FIREBASE_API_KEY"),
    authDomain: getRequiredEnvVar("FIREBASE_AUTH_DOMAIN"),
    projectId: getRequiredEnvVar("FIREBASE_PROJECT_ID"),
    storageBucket: getRequiredEnvVar("FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: getRequiredEnvVar("FIREBASE_MESSAGING_SENDER_ID"),
    appId: getRequiredEnvVar("FIREBASE_APP_ID"),
    measurementId: getRequiredEnvVar("FIREBASE_MEASUREMENT_ID")
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
