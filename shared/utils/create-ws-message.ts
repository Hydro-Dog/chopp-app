import { WsMessage } from "../types";

export const createWsMessage = ({
  type,
  code,
  message,
  payload,
}: WsMessage) => ({
  type,
  code,
  message,
  timeStamp: new Date().valueOf(),
  payload,
});
