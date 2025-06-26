import { defineConfig } from "cypress";
import dotenv from "dotenv";
import mochawesome from "cypress-mochawesome-reporter/plugin.js";

dotenv.config();

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  chromeWebSecurity: true,
  video: true,
  videoCompression: true,
  // videosFolder: "cypress/videos",
  e2e: {
    baseUrl: "https://magento.softwaretestingboard.com",
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      reportFilename: "trusygnal-automation-report",
      charts: true,
      reportPageTitle: "TruSygnals Automation Suite Execution Report",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: true,
      // videoOnFailOnly: true,
      // ignoreVideos: false,
      showHooks: "none",
      code: false,
    },
    setupNodeEvents(on, config) {
      mochawesome(on);
      return config;
    },
  },
  env: {
    USER_FIRSTNAME: process.env.USER_FIRSTNAME,
    USER_LASTNAME: process.env.USER_LASTNAME,
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD,
  },
});
