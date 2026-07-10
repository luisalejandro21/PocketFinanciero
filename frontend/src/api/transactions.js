import api from "./axios";

export const getTransactions = async () => {
  const response = await api.get("/transactions/");
  return response.data;
};

export const getTransactionById = async (id) => {
  const response = await api.get(`/transactions/${id}/`);
  return response.data;
};

export const createTransaction = async (transactionData) => {
  const response = await api.post("/transactions/", transactionData);
  return response.data;
};

export const updateTransaction = async (id, transactionData) => {
  const response = await api.patch(`/transactions/${id}/`, transactionData);
  return response.data;
};

export const cancelTransaction = async (id) => {
  const response = await api.patch(`/transactions/${id}/`, {
    status: "CANCELLED",
  });

  return response.data;
};