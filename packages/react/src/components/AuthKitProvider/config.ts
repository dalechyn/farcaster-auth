import { createAppClient, viemConnector } from "@fc-auth/core";
import { type Config } from "../../types/config.js";

const domainDefaults =
  typeof window !== "undefined" && window?.location
    ? {
        domain: window.location.host,
        siweUri: window.location.href,
      }
    : {};

const configDefaults = {
  relay: "https://relay.farcaster.xyz",
  version: "v1",
  ...domainDefaults,
};

export function createConfig(config: Omit<Config, "appClient">): Config {
  const authKitConfig = {
    ...configDefaults,
    ...config,
  };

  const { relay, rpcUrl, version, provider } = authKitConfig;

  const ethereum = viemConnector(rpcUrl ? { rpcUrl } : undefined);
  const appClient = createAppClient(
    {
      relay,
      ethereum,
      version,
    },
    provider,
  );
  return { ...authKitConfig, appClient };
}
