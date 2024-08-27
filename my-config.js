// eslint-disable-next-line no-undef
export const CONFIG = __DEV__
  ? {
      apiUrl: "http://localhost:4004/api/",
    }
  : {
      apiUrl: "http://localhost:4477/api/",
    };
