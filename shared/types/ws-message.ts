import { WS_MESSAGE_TYPE } from "./ws-message-type";

export type WsMessage = Record<string, any> & {
  type: WS_MESSAGE_TYPE;
  code: string;
  message?: string;
  payload?: Record<string, any>;
};
