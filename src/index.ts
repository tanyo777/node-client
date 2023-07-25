import io from "socket.io-client";
import dotenv from "dotenv";
dotenv.config();

import envConfig from "./config/envConfig";
import getMachineMetrics from "./utils/getMachineMetrics";
import { IMachineMetrics } from "./types/objectTypes";

const main = () => {
  const socket = io(envConfig.wsServerUrl, {
    auth: {
      secret: envConfig.secretKeyNodeClients,
    },
  });

  socket.on("errorConnection", (message) => {
    console.log(message);
  });

  let machineMetrics: IMachineMetrics;

  setInterval(async () => {
    machineMetrics = await getMachineMetrics();
    socket.emit("metrics", machineMetrics);
  }, 1000);
};

main();
