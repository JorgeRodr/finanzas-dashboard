import { adminAuth } from "@/lib/firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COLLECTION_NAME = 'transactions';
const db = getFirestore();

export async function GET(req: Request, { params }: { params: { id: string } }) {} //TO DO

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    const docRef = db.collection(COLLECTION_NAME).doc(params.id);
    const existingDoc = await docRef.get();

    if (!existingDoc.exists) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    const transactionData = existingDoc.data();

    if (transactionData && transactionData.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    await docRef.update({
      ...body,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedToken = await adminAuth.verifyIdToken(token);

    if (!decodedToken) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const docRef = db.collection(COLLECTION_NAME).doc(params.id);

    await docRef.delete();

    return NextResponse.json({ message: 'Transacción eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la transacción:', error);
    return NextResponse.json({ error: 'Error al eliminar la transacción' }, { status: 500 });
  }
}