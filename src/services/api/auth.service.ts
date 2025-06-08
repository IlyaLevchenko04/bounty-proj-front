import axios from "axios";
import type { AuthFormData, AuthResponse } from "../../shared/schemas/auth";
import { LocalStorageKeys } from "../../shared/constants/localStorageKeys";
import { ENV } from "@/shared/constants/env";

export const getAuthHeader = () => {
  const token = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  return token ? { Authorization: `Bearer ${JSON.parse(token)}` } : {};
};

export const registerUser = async (
  data: AuthFormData
): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${ENV.API_URL}/auth/register`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Registration failed";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const loginUser = async (data: AuthFormData): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${ENV.API_URL}/auth/login`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Login failed";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getUserById = async (data: { id: string }) => {
  try {
    const response = await axios.get(`${ENV.API_URL}/auth/${data.id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to get user";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
};
