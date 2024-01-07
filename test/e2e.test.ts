import { Client, TokenCreateTransaction } from "@hashgraph/sdk";
import * as dotenv from "dotenv";
import { getApproveAllowanceTransaction } from "../src/transactions/approveAllowance";
import { getLockTokenTransaction } from "../src/transactions/lockToken";
dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientKey = process.env.CLIENT_KEY;

if (!clientId || !clientKey) {
  throw new Error("Missing environment variables CLIENT_ID and CLIENT_KEY");
}

const client =
  process.env.NETWORK === "testnet" ? Client.forTestnet() : Client.forMainnet();

client.setOperator(clientId, clientKey);

let tokenId = "";
const AMOUNT_TO_LOCK = 1000_0000;

describe("e2e", () => {
  it("Should create new token", async () => {
    await createFt();
  });
  it("Should fail approval allowance because incorrect body", async () => {
    try {
      await getApproveAllowanceTransaction({
        tokenId,
        transactionPayerId: clientId.slice(4),
        accountId: clientId,
        amount: AMOUNT_TO_LOCK,
      });
    } catch (error: any) {
      expect(error.message).toBe(
        "API call failed: Error: 400: Transaction Payer ID must start with 0.0"
      );
    }
  });

  it("Should approve allowance", async () => {
    const transaction = await getApproveAllowanceTransaction({
      tokenId,
      transactionPayerId: clientId,
      accountId: clientId,
      amount: AMOUNT_TO_LOCK,
    });
    const submit = await transaction.execute(client);
    const receipt = await submit.getReceipt(client);
    expect(receipt.status._code).toBe(22);
  });

  it("Should fail lock transaction because date is in the past", async () => {
    try {
      await getLockTokenTransaction({
        tokenId,
        transactionPayerId: clientId,
        amountToLock: AMOUNT_TO_LOCK,
        endDate: "2021-01-01",
      });
    } catch (error: any) {
      expect(error.message).toBe(
        "API call failed: Error: 400: End date cannot be before today's date"
      );
    }
  });

  it("Should lock token", async () => {
    const transaction = await getLockTokenTransaction({
      tokenId,
      transactionPayerId: clientId,
      amountToLock: AMOUNT_TO_LOCK,
      endDate: "2024-12-31",
    });
    const submit = await transaction.execute(client);
    const receipt = await submit.getReceipt(client);
    expect(receipt.status._code).toBe(22);
  });
});

const createFt = async () => {
  console.log("Creating FT");
  const transaction = new TokenCreateTransaction()
    .setTokenName("hPad Test Lock Token")
    .setTokenSymbol("hPad")
    .setTreasuryAccountId(clientId)
    .setInitialSupply(100_000_0000)
    .setDecimals(4)
    .freezeWith(client);
  const submit = await transaction.execute(client);
  const receipt = await submit.getReceipt(client);
  tokenId = receipt.tokenId!.toString();
  console.log("Token ID: ", tokenId);
};
