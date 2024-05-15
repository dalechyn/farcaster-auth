import { type AppClient } from "@fc-auth/core";
import { type Provider } from "ethers";

export interface Config {
  relay?: string;
  domain: string;
  siweUri: string;
  rpcUrl?: string;
  redirectUrl?: string;
  version?: string;
  appClient: AppClient;
  provider?: Provider;
}
