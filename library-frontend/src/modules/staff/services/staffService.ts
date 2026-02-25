import { getAuthHeaders } from "../../../utils/getAuthHeaders";

const API_URL = "http://127.0.0.1:8000/api";

export const createStaff = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await fetch(`${API_URL}/create-staff`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to create staff");
  }

  return response.json();
};

export const getStaffList = async () => {
  const response = await fetch(`${API_URL}/staff`, {
    headers: getAuthHeaders(),
  });

  return response.json();
};