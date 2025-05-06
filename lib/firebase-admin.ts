// lib/firebase-admin.ts
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

let adminApp;

if (!getApps().length) {
  adminApp = initializeApp({
    credential: cert(serviceAccount as any),
  });
} else {
  adminApp= getApps()[0]
}

export const adminAuth = getAuth();
export const adminDb = getFirestore(adminApp);
