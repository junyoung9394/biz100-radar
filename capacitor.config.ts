import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.luckygrampus.biz100radar",
  appName: "Biz100 Radar",
  webDir: "out",
  server: {
    url: "https://biz100.luckygrampus.com",
    cleartext: false
  },
  android: {
    allowMixedContent: false,
    backgroundColor: "#ffffff"
  }
};

export default config;
