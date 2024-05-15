import { type Client } from "../../clients/createClient.js";
import {
  type VerifySiweMessageWithVerifierReturnType,
  type VerifySiweMessageWithVerifierParameters,
  verifySiweMessageWithVerifier as util_verifySiweMessage,
} from "../../utils/verifySiweMessageWithVerifier.js";
import type { Omit } from "../../types/utils.js";
import type { Provider } from "ethers";

export type VerifySiweMessageParameters = Omit<VerifySiweMessageWithVerifierParameters, "verifier">;

export type VerifySiweMessageReturnType = VerifySiweMessageWithVerifierReturnType;

export const verifySiweMessage = (
  client: Client,
  { nonce, domain, message, signature }: VerifySiweMessageParameters,
  provider?: Provider,
): Promise<VerifySiweMessageReturnType> => {
  return util_verifySiweMessage({
    nonce,
    domain,
    message,
    signature,
    verifier: {
      getFid: client.ethereum.getFid,
      provider: provider,
    },
  });
};