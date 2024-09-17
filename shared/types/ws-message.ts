export type WsMessage = Record<string, any> & {
  type: "callStatus";
  code: string;
  message?: string;
  payload?: Record<string, any>;
};
