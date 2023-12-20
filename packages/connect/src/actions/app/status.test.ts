import { createAppClient } from "../../clients/createAppClient";
import { jest } from "@jest/globals";

describe("status", () => {
  const client = createAppClient({
    relayURI: "https://connect.farcaster.xyz",
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const statusResponseDataStub = {
    state: "pending",
    nonce: "abcd1234",
    connectURI: "farcaster://connect?nonce=abcd1234[...]",
  };

  test("constructs API request", async () => {
    const response = new Response(JSON.stringify(statusResponseDataStub));
    const spy = jest.spyOn(global, "fetch").mockResolvedValue(response);

    const res = await client.status({
      channelToken: "some-channel-token",
    });

    expect(res.response).toEqual(response);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("https://connect.farcaster.xyz/v1/connect/status", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer some-channel-token",
      },
    });
  });
});