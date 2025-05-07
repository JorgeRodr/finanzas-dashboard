import { UserFirestoreData } from "@/interfaces/user";
import { postResponse } from "@/lib/apiResponses";
import { adminAuth } from "@/lib/firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

const COLLECTION_NAME = 'users';
const db = getFirestore();

export async function GET(req: Request) {} //TO DO

export async function POST(req: Request) {

    try {
    const body = await req.json();
    const {email, password, displayName} = body;
    const userRecord = await adminAuth.createUser({
        email,
        password,
        displayName,
      });
    const newUser = {
        id: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        createdAt: new Date().toISOString(),
      }
    const userRef = db.collection(COLLECTION_NAME).doc(userRecord.uid);
    await userRef.set(newUser);
    return postResponse(newUser as UserFirestoreData, COLLECTION_NAME);
    } catch (error) {
    console.error("Insert transaction error:", error);
    return NextResponse.json({ error: 'Insert transaction error' }, { status: 403 });
    }
}
