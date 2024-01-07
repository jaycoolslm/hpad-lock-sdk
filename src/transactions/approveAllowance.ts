import { Transaction } from "@hashgraph/sdk";
import { getApprovalTransactionBytes } from "../api/apiClient";
import type { AllowanceApproveCallInput } from "../types/approveAllowance";

export const getApproveAllowanceTransaction = async (
  allowanceApproveInput: AllowanceApproveCallInput,
  debug: boolean = false
) => {
  if (debug) {
    console.log("Approve Allowance Input: ", allowanceApproveInput);
  }
  const uint8Array = await getApprovalTransactionBytes(allowanceApproveInput);
  if (debug) {
    console.log("Uint8Array: ", uint8Array);
  }
  const transaction = Transaction.fromBytes(uint8Array);
  if (debug) {
    console.log("Transaction: ", transaction);
  }
  return transaction;
};
