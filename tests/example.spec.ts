import { testDemo, expect } from "@/fixtures/testFixture";
import { testData, testDataMobile, testDataWeb } from "@/fixtures/fileUtil";
import { hasChildTile, hasChildTag } from "@/fixtures/HasChild";

const testTitle = (inKey: number, inText: string) => {
  return `Test Case: 00${(inKey + 1).toString()}: ${inText}`;
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
      testTitle(+key, "Log In Success: Mobile and Web"),
      async ({ dashboardPage }) => {
        await expect(dashboardPage.logoutButton).toBeVisible({
          timeout: 10000,
        });
        await expect(dashboardPage.todoColumn).toBeVisible();
      }
    );

    testDemo(
      testTitle(+key, "Correct View: Mobile and Web"),
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
        testTitle(+key, `Verify Correct Columns ${value.navigate}`),
        async ({ dashboardPage, page }) => {
          if (value.navigate.includes("web")) {
            await expect(dashboardPage.pageTitleWeb).toBeVisible();
            await expect(dashboardPage.todoColumn).toBeVisible();
            await expect(dashboardPage.inProgressColumn).toBeVisible();
            await expect(dashboardPage.doneColumn).toBeVisible();
          }

          // the view uses same framework for mobile and web
          // just do check here instead of separate test case
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
        `${+key}, Verify Correct Columns Web ${value.verify}`,
        async ({ dashboardPage, page }) => {
          const hasChildTodo = await hasChildTile(
            dashboardPage.todoColumn,
            page,
            "h3",
            value.verify
          );

          if (hasChildTodo) expect(hasChildTodo).toBeTruthy();

          const hasChildInProgress = await hasChildTile(
            dashboardPage.todoColumn,
            page,
            "h3",
            value.verify
          );
          if (hasChildInProgress) expect(hasChildInProgress).toBeTruthy();
        }
      );

      testDemo(
        `${+key}, Verify Tags Web ${value.navigate}`,
        async ({ dashboardPage, page }) => {
          for (let tag of value.tags) {
            const hasTagTodo = await hasChildTag(
              dashboardPage.todoColumn,
              page,
              "span",
              tag
            );

            if (hasTagTodo) expect(hasTagTodo).toBeTruthy();

            const hasTagInProgress = await hasChildTag(
              dashboardPage.todoColumn,
              page,
              "span",
              tag
            );
            if (hasTagInProgress) expect(hasTagInProgress).toBeTruthy();
          }
        }
      );
    }
    for (const [key, value] of Object.entries(testDataMobile())) {
      testDemo(
        `${+key}, Verify Correct Columns Mobile ${value.navigate}`,
        async ({ dashboardPageM, page }) => {
          await dashboardPageM.mobileAppButton.click();
          await expect(dashboardPageM.todoColumn).toBeVisible();

          const hasChildTodo = hasChildTile(
            dashboardPageM.todoColumn,
            page,
            "h3",
            value.verify
          );

          if (hasChildTodo) expect(hasChildTodo).toBeTruthy();

          const hasChildInProgress = hasChildTile(
            dashboardPageM.todoColumn,
            page,
            "h3",
            value.verify
          );

          if (hasChildInProgress) expect(hasChildInProgress).toBeTruthy();

          const hasChildDone = await hasChildTile(
            dashboardPageM.doneColumn,
            page,
            "h3",
            value.verify
          );

          if (hasChildDone) expect(hasChildDone).toBeTruthy();
        }
      );

      testDemo(
        `${+key}, Verify Tags Mobile ${value.navigate}`,
        async ({ dashboardPageM, page }) => {
          for (let tag of value.tags) {
            const hasTagTodo = await hasChildTag(
              dashboardPageM.doneColumn,
              page,
              tag,
              "span"
            );
            if (hasTagTodo) expect(hasTagTodo).toBeTruthy();

            const hasTagInProgress = await hasChildTag(
              dashboardPageM.doneColumn,
              page,
              tag,
              "span"
            );
            if (hasTagInProgress) expect(hasTagInProgress).toBeTruthy();

            const hasTagDone = await hasChildTag(
              dashboardPageM.doneColumn,
              page,
              tag,
              "span"
            );
            if (hasTagDone) expect(hasTagDone).toBeTruthy();
          }
        }
      );
    }
  }
);
