import { Transaction } from "@hashgraph/sdk";
import { getLockTransactionBytes } from "../api/apiClient";
import { LockTokenCallInput } from "../types/lockToken";

export const getLockTokenTransaction = async (
  lockTokenInput: LockTokenCallInput,
  debug: boolean = false
) => {
  if (debug) {
    console.log("Lock Token Input: ", lockTokenInput);
  }
  const uint8Array = await getLockTransactionBytes(lockTokenInput);
  if (debug) {
    console.log("Uint8Array: ", uint8Array);
  }
  const transaction = Transaction.fromBytes(uint8Array);
  if (debug) {
    console.log("Transaction: ", transaction);
  }
  return transaction;
};
