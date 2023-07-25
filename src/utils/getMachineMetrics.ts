import osUtils from "node-os-utils";
import moment from "moment";

const osWrapper = (platform: string): string => {
  if (platform === "darwin") {
    return "Mac";
  }
  if (platform === "win32") {
    return "Windows";
  }
  return platform;
};

const getMachineMetrics = async () => {
  const cpuUsage = Math.floor(await osUtils.cpu.usage());
  const memoryInfo = await osUtils.mem.info();

  return {
    // cpu
    cpuCount: osUtils.cpu.count(),
    cpuModel: osUtils.cpu.model(),
    cpuUsage: cpuUsage + "%",
    os: osWrapper(osUtils.os.platform()),
    uptime: moment.duration(osUtils.os.uptime(), "seconds").humanize(),
    ip: osUtils.os.ip(),
    hostname: osUtils.os.hostname(),

    // memory
    totalMem: Math.floor(memoryInfo.totalMemMb / 1000) + "gb",
    freeMem: (memoryInfo.freeMemMb / 1000).toFixed(2) + "gb",
    usedMem: memoryInfo.usedMemPercentage + "%",
  };
};

export default getMachineMetrics;
