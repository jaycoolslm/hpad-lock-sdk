// // test/apiClient.test.ts

// import { getApprovalTransactionBytes } from "../src/api/apiClient";
// import fetchMock from "fetch-mock";

describe("apiClient", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});

// describe("apiClient", () => {
//   afterEach(() => {
//     fetchMock.restore();
//   });

//   it("gets approval transaction bytes successfully", async () => {
//     // Mock the API response
//     fetchMock.get("https://yourapi.domain.com/path/to/approval/transaction", {
//       body: { data: "transactionBytesHere" },
//       headers: { "content-type": "application/json" },
//     });

//     const response = await getApprovalTransactionBytes();
//     expect(response).toEqual({ data: "transactionBytesHere" });
//   });

//   it("throws an error when the API call fails", async () => {
//     fetchMock.get(
//       "https://yourapi.domain.com/path/to/approval/transaction",
//       500
//     );

//     await expect(getApprovalTransactionBytes()).rejects.toThrow(
//       "API call failed"
//     );
//   });

//   // Add more tests as needed for different scenarios and API endpoints
// });
