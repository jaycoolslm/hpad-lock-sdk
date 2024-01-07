// src/api/apiClient.ts
import { AllowanceApproveCallInput } from "../types/approveAllowance";
import { LockTokenCallInput } from "../types/lockToken";

type RequestOptions = {
  method: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
};

const BASE_URL = "http://localhost:5173/api/v1/";

async function fetchFromAPI(
  endpoint: string,
  options?: RequestOptions
): Promise<Response> {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      // Assuming the API returns error details in a standard format
      const error = await response.json();
      throw new Error(`${response.status}: ${error.message}`);
    }
    return response;
  } catch (error) {
    throw new Error(`API call failed: ${error}`);
  }
}

// Function specific to the "approval transaction" of HPad Lock API
export const getApprovalTransactionBytes = async (
  allowanceApproveInput: AllowanceApproveCallInput
): Promise<Uint8Array> => {
  const response = await fetchFromAPI("approve-allowance", {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
    },
    body: JSON.stringify(allowanceApproveInput),
  });
  return new Uint8Array(await response.arrayBuffer());
};

// Function specific to the "execute smart contract" of HPad Lock API
export const getLockTransactionBytes = async (
  lockTokenCallInput: LockTokenCallInput
): Promise<Uint8Array> => {
  const response = await fetchFromAPI("lock-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
    },
    body: JSON.stringify(lockTokenCallInput),
  });
  return new Uint8Array(await response.arrayBuffer());
};

// Add more specific functions or helpers as needed
