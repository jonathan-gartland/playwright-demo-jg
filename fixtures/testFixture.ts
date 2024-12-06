import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashBoardPage";
import testDataFromFile from "../data/qa/animated.gingersnap.json";

import { testData, testDataMobile, testDataWeb } from "../data/fileUtil";

interface TestFixtures {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  dashboardPageM: DashboardPage;
  // testData: {};
  // testDataWeb: {};
  // testDataMobile: {};
}

export const testDemo = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage: LoginPage = new LoginPage(page);
    const userData = {
      name: process.env.USERNAME !== undefined ? process.env.USERNAME : "admin",
      password:
        process.env.PASSWORD !== undefined
          ? process.env.PASSWORD
          : "password123",
    };

    await loginPage.open(
      process.env.BASE_URL !== undefined
        ? process.env.BASE_URL
        : "https://animated-gingersnap-8cf7f2.netlify.app/"
    );
    await loginPage.login(userData.name, userData.password);
    await use(loginPage);
  },
  dashboardPage: async ({ page, loginPage }, use) => {
    const dashboardPage: DashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  dashboardPageM: async ({ page, loginPage }, use) => {
    const dashboardPageM: DashboardPage = new DashboardPage(page);
    await dashboardPageM.mobileAppButton.click();
    await use(dashboardPageM);
  },
  // testData: async ({}, use) => {
  //   await use(testData());
  // },
  // testDataWeb: async ({}, use) => {
  //   await use(testDataWeb());
  // },
  // testDataMobile: async ({}, use) => {
  //   await use(testDataMobile());
  // },
});
export { expect } from "@playwright/test";
