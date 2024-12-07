import {
  LaunchOptions,
  Logger,
  Page,
  ConsoleMessage,
  Request,
  test as base,
} from "@playwright/test";
import { LoginPage } from "@/pages/LoginPage";
import { DashboardPage } from "@/pages/DashBoardPage";

interface TestFixtures {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  dashboardPageM: DashboardPage;
}

type LogSeverity = "info" | "warning" | "error";

export const testDemo = base.extend<
  TestFixtures,
  { launchOptions: LaunchOptions }
>({
  launchOptions: async ({}, use) => {
    const logger: Logger = {
      isEnabled: (name: string, severity: LogSeverity) => name === "api",
      log: (
        name: string,
        severity: LogSeverity,
        message: string,
        args: any[]
      ) => console.log(`${name} ${severity} ${message} ${args.join(" ")}`),
    };
    await use({ logger });
  },
  saveLogs: [
    async ({ page }, use) => {
      const getDate = () => new Date().toISOString();

      const listenerPageLoad = (page: Page, label: string) => {
        console.log(`${getDate()} ${label}: ${page.url()}`);
      };
      page.on("domcontentloaded", (page: Page) =>
        listenerPageLoad(page, "Event DOMContentLoad")
      );
      page.on("load", (page: Page) => listenerPageLoad(page, "Event Load"));
      page.on("console", (message: ConsoleMessage) =>
        console.log(`${getDate()} Event Console: ${message.text()}`)
      );
      page.on("pageerror", (error: Error) =>
        console.log(`${getDate()} ## PAGE ERROR ##: ${error.message}`)
      );

      const listenerRequest = (request: Request, label: string) => {
        console.log(
          `${getDate()} ${label}: ${request.url()} ${request.resourceType()}`
        );
      };
      page.on("request", (request: Request) =>
        listenerRequest(request, "Request")
      );
      page.on("requestfinished", (request: Request) =>
        listenerRequest(request, "Request Finished")
      );
      page.on("requestfailed", (request: Request) =>
        listenerRequest(request, "## REQUEST FAILED ##")
      );

      await use();
    },
    { auto: true },
  ],
  ignoreHTTPSErrors: undefined,

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
});

export { expect } from "@playwright/test";
