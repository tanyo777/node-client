const envConfig = {
  secretKeyNodeClients: process.env.SECRET_KEY_NODE_CLIENTS as string,
  wsServerUrl: process.env.WS_SERVER_URL as string,
};

export default envConfig;
