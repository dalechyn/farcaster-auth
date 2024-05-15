import { type Client } from "../../clients/createClient.js";
import { get } from "../../clients/transports/http.js";
import { type ChannelGetReturnType } from "@fc-auth/relay";

export type ChannelParameters = {
  channelToken: string;
};

export type ChannelReturnType = ChannelGetReturnType;

const path = "channel/status";

export const channel = (client: Client, { channelToken }: ChannelParameters): Promise<ChannelReturnType> => {
  return get<ChannelReturnType>(client, path, {
    channelToken: channelToken,
  });
};
