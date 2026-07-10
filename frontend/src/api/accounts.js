import api from "./axios";

export const getAccounts = async () => {
  const response = await api.get("/accounts/");
  return response.data;
};

export const createAccount = async (accountData) => {
  const response = await api.post("/accounts/", accountData);
  return response.data;
};

export const getAccountById = async (id) => {
  const response = await api.get(`/accounts/${id}/`);
  return response.data;
};

export const updateAccount = async (id, accountData) => {
  const response = await api.patch(`/accounts/${id}/`, accountData);
  return response.data;
};

export const deactivateAccount = async (id) => {
  const response = await api.patch(`/accounts/${id}/`, {
    is_active: false,
  });

  return response.data;
};

export const reactivateAccount = async (id) => {
  const response = await api.patch(`/accounts/${id}/`, {
    is_active: true,
  });

  return response.data;
};