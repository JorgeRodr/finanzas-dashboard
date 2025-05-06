import { Transaction, TransactionFirebaseData } from "@/interfaces/transaction";
import { db } from "@/lib/firebase";
import axios from "axios";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

const COLLECTION_NAME = 'transactions';

export const getTransactionsFromFirestore = () => {
  return axios.get("/api/transactions");

}

export const addTransactionToFirestore = async (transaction: Transaction) => {
  return axios.post("/api/transactions", transaction);
}

export const updateTransactionOnFirestore = async (transaction: TransactionFirebaseData) => {
  const {id, ...data} = transaction;
  await updateDoc(doc(db, COLLECTION_NAME, id), data);
}

export const deleteTransactionFromFirestore = async (id: TransactionFirebaseData['id']) => {
  await deleteDoc(doc(db, 'transactions', id));
}