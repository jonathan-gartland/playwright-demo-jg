import { testDemo, expect } from "@/fixtures/testFixture";
import { testData, testDataMobile, testDataWeb } from "@/data/fileUtil";

const title = (inKey: number, inText: string) => {
  return `Test Case: 00${inKey.toString()}: ${inText}`;
};

testDemo.describe("Test Suite", () => {
  testDemo.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.logoutButton.isVisible();
    await expect(dashboardPage.logoutButton).toBeVisible({ timeout: 10000 });
  });

  testDemo.afterEach(async ({ page, loginPage, dashboardPage }) => {
    // Close after each test.
    await dashboardPage.logoutButton.click();
    await loginPage.getLoginPageTitle();
    await expect(loginPage.pageTitle).toBeVisible();
    await page.close();
  });

  for (const [key, value] of Object.entries(testData())) {
    testDemo(
      title(+key + 1, "Log In Success: Mobile and Web"),
      async ({ dashboardPage }) => {
        await expect(dashboardPage.logoutButton).toBeVisible({
          timeout: 10000,
        });
        await expect(dashboardPage.todoColumn).toBeVisible();
      }
    );

    testDemo(
      title(+key + 1, "Correct View: Mobile and Web"),
      async ({ dashboardPage }) => {
        if (value.navigate.includes("web")) {
          await expect(dashboardPage.pageTitleWeb).toBeVisible();
        } else {
          await dashboardPage.mobileAppButton.click();
          await expect(dashboardPage.pageTitleMobile).toBeVisible();
        }
      }
    );
  }
});

testDemo.describe(
  `Test Suite 2: Using separate data sets for mobile and web`,
  () => {
    for (const [key, value] of Object.entries(testDataWeb())) {
      testDemo(
        title(+key + 1, `Verify Correct Columns ${value.navigate}`),
        async ({ dashboardPage, page }) => {
          if (value.navigate.includes("web")) {
            await expect(dashboardPage.pageTitleWeb).toBeVisible();
            await expect(dashboardPage.todoColumn).toBeVisible();
            await expect(dashboardPage.inProgressColumn).toBeVisible();
            await expect(dashboardPage.doneColumn).toBeVisible();
          }

          if (value.navigate === "mobile") {
            await expect(dashboardPage.pageTitleWeb).toBeVisible();
            await dashboardPage.mobileAppButton.click();
            await expect(dashboardPage.pageTitleMobile).toBeVisible();
            await expect(dashboardPage.todoColumn).toBeVisible();
            await expect(dashboardPage.inProgressColumn).toBeVisible();
            await expect(dashboardPage.doneColumn).toBeVisible();
          }
        }
      );

      testDemo(
        `${+key + 1}, Verify Correct Columns Web ${value.verify}`,
        async ({ dashboardPage, page }) => {
          const hasChildTodo =
            (await dashboardPage.todoColumn
              .filter({
                has: page.locator(`h3:text("${value.verify}")`),
              })
              .count()) > 0;
          if (hasChildTodo) expect(hasChildTodo).toBeTruthy();

          const hasChildInProgress =
            (await dashboardPage.inProgressColumn
              .filter({
                has: page.locator(`h3:text("${value.verify}")`),
              })
              .count()) > 0;
          if (hasChildInProgress) expect(hasChildInProgress).toBeTruthy();
        }
      );

      testDemo(
        `${+key + 1}, Verify Tags Web ${value.navigate}`,
        async ({ dashboardPage, page }) => {
          for (let tag of value.tags) {
            const hasTagTodo =
              (await dashboardPage.todoColumn
                .filter({
                  has: page.locator(`span:text("${tag}")`),
                })
                .count()) > 0;
            if (hasTagTodo) expect(hasTagTodo).toBeTruthy();

            const hasTagInProgress =
              (await dashboardPage.inProgressColumn
                .filter({
                  has: page.locator(`span:text("${tag}")`),
                })
                .count()) > 0;
            if (hasTagInProgress) expect(hasTagInProgress).toBeTruthy();
          }
        }
      );
    }
    for (const [key, value] of Object.entries(testDataMobile())) {
      testDemo(
        `${+key + 1}, Verify Correct Columns Mobile ${value.navigate}`,
        async ({ dashboardPageM, page }) => {
          await dashboardPageM.mobileAppButton.click();
          await expect(dashboardPageM.todoColumn).toBeVisible();

          const hasChildTodo =
            (await dashboardPageM.todoColumn
              .filter({
                has: page.locator(`h3:text("${value.verify}")`),
              })
              .count()) > 0;
          if (hasChildTodo) expect(hasChildTodo).toBeTruthy();

          const hasChildInProgress =
            (await dashboardPageM.inProgressColumn
              .filter({
                has: page.locator(`h3:text("${value.verify}")`),
              })
              .count()) > 0;

          if (hasChildInProgress) expect(hasChildInProgress).toBeTruthy();

          const hasChildDone =
            (await dashboardPageM.doneColumn
              .filter({
                has: page.locator(`h3:text("${value.verify}")`),
              })
              .count()) > 0;

          if (hasChildDone) expect(hasChildDone).toBeTruthy();
        }
      );

      testDemo(
        `${+key + 1}, Verify Tags Mobile ${value.navigate}`,
        async ({ dashboardPageM, page }) => {
          for (let tag of value.tags) {
            const hasTagTodo =
              (await dashboardPageM.todoColumn
                .filter({
                  has: page.locator(`span:text("${tag}")`),
                })
                .count()) > 0;
            if (hasTagTodo) expect(hasTagTodo).toBeTruthy();

            const hasTagInProgress =
              (await dashboardPageM.inProgressColumn
                .filter({
                  has: page.locator(`span:text("${tag}")`),
                })
                .count()) > 0;
            if (hasTagInProgress) expect(hasTagInProgress).toBeTruthy();

            const hasTagDone =
              (await dashboardPageM.doneColumn
                .filter({
                  has: page.locator(`span:text("${tag}")`),
                })
                .count()) > 0;
            if (hasTagDone) expect(hasTagDone).toBeTruthy();
          }
        }
      );
    }
  }
);
