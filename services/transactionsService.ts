import { Transaction, TransactionFirebaseData } from "@/interfaces/transaction";
import axios from "axios";

export const getTransactionsFromFirestore = () => {
  return axios.get("/api/transactions");

}

export const addTransactionToFirestore = async (transaction: Transaction) => {
  return axios.post("/api/transactions", transaction);
}

export const updateTransactionOnFirestore = async (transaction: TransactionFirebaseData) => {
  const {id, ...data} = transaction;
  return axios.patch(`/api/transactions/${id}`, transaction);
}

export const deleteTransactionFromFirestore = async (id: TransactionFirebaseData['id']) => {
  return axios.delete(`/api/transactions/${id}`);
}