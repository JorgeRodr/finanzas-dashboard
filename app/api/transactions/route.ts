import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";
import { TransactionFirebaseData } from "@/interfaces/transaction";
import { getFirestore } from "firebase-admin/firestore";
import { postResponse } from "@/lib/apiResponses";

const COLLECTION_NAME = 'transactions';
const db = getFirestore();

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const snapshot = await db
      .collection(COLLECTION_NAME)
      .where('userId', '==', userId)
      .get();
    const transactions: TransactionFirebaseData[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data()),
    } as TransactionFirebaseData));

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Fetch transactions error:", error);
    return NextResponse.json({ error: 'Fetch transactions error' }, { status: 403 });
  }
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;
    const body = await req.json();
    const newTransaction = {userId, ...body}
    const collectionRef = db.collection(COLLECTION_NAME);

    await collectionRef.add(newTransaction);
    return postResponse(newTransaction, COLLECTION_NAME);
  } catch (error) {
    console.error("Insert transaction error:", error);
    return NextResponse.json({ error: 'Insert transaction error' }, { status: 403 });
  }
}
