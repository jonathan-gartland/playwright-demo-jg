import { testDemo, expect } from "@/fixtures/testFixture";
import { testData, testDataMobile, testDataWeb } from "@/fixtures/fileUtil";
import { hasChildTile, hasChildTag } from "@/fixtures/HasChild";
import { DashboardPage } from "@/pages/DashBoardPage";

const testTitle = (inKey: number, inText: string) => {
  return `Test Case: 00${(inKey + 1).toString()}: ${inText}`;
};

const verifyColumns = async (dashboardPage: DashboardPage, value: {}) => {
  if (value.navigate.includes("web")) {
    await expect(dashboardPage.pageTitleWeb).toBeVisible();
    await expect(dashboardPage.todoColumn).toBeVisible();
    await expect(dashboardPage.inProgressColumn).toBeVisible();
    await expect(dashboardPage.doneColumn).toBeVisible();
  } else {
    await dashboardPage.mobileAppButton.click();
    await expect(dashboardPage.pageTitleMobile).toBeVisible();
    await expect(dashboardPage.todoColumn).toBeVisible();
    await expect(dashboardPage.inProgressColumn).toBeVisible();
    await expect(dashboardPage.doneColumn).toBeVisible();
  }
};

const verifyTags = async (dashboardPage: DashboardPage, value: {}) => {
  for (let tag of value.tags) {
    const hasTagTodo = await hasChildTag(
      dashboardPage,
      dashboardPage.todoColumn,
      "span",
      tag
    );
    if (hasTagTodo) expect(hasTagTodo).toBeTruthy();

    const hasTagInProgress = await hasChildTag(
      dashboardPage,
      dashboardPage.todoColumn,
      "span",
      tag
    );
    if (hasTagInProgress) expect(hasTagInProgress).toBeTruthy();
  }
};

testDemo.describe("Test Suite 1", () => {
  testDemo.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.logoutButton.isVisible();
    await expect(dashboardPage.logoutButton).toBeVisible({ timeout: 10000 });
  });

  testDemo.afterEach(async ({ page, loginPage, dashboardPage }) => {
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
        await verifyColumns(dashboardPage, value);
      }
    );
  }
});

testDemo.describe(
  "Test Suite 2: Using separate data sets for mobile and web",
  () => {
    testDemo.beforeEach(async ({ dashboardPage }) => {
      await dashboardPage.logoutButton.isVisible();
      await expect(dashboardPage.logoutButton).toBeVisible({ timeout: 10000 });
    });

    testDemo.afterEach(async ({ page, loginPage, dashboardPage }) => {
      await dashboardPage.logoutButton.click();
      await loginPage.getLoginPageTitle();
      await expect(loginPage.pageTitle).toBeVisible();
      await page.close();
    });

    for (const [key, value] of Object.entries(testDataWeb())) {
      testDemo(
        testTitle(+key, `Verify Correct Columns ${value.navigate}`),
        async ({ dashboardPage }) => {
          await verifyColumns(dashboardPage, value);
        }
      );

      testDemo(
        testTitle(+key, `Verify Correct Columns Web ${value.verify}`),
        async ({ dashboardPage }) => {
          const hasChildTodo = await hasChildTile(
            dashboardPage,
            dashboardPage.todoColumn,
            "h3",
            value.verify
          );
          if (hasChildTodo) expect(hasChildTodo).toBeTruthy();

          const hasChildInProgress = await hasChildTile(
            dashboardPage,
            dashboardPage.todoColumn,
            "h3",
            value.verify
          );
          if (hasChildInProgress) expect(hasChildInProgress).toBeTruthy();
        }
      );

      testDemo(
        testTitle(+key, `Verify Tags Web ${value.navigate}`),
        async ({ dashboardPage }) => {
          await verifyTags(dashboardPage, value);
        }
      );
    }

    for (const [key, value] of Object.entries(testDataMobile())) {
      testDemo(
        testTitle(+key, `Verify Correct Columns Mobile ${value.navigate}`),
        async ({ dashboardPageM }) => {
          await dashboardPageM.mobileAppButton.click();
          await expect(dashboardPageM.todoColumn).toBeVisible();

          const hasChildTodo = await hasChildTile(
            dashboardPageM,
            dashboardPageM.todoColumn,
            "h3",
            value.verify
          );
          if (hasChildTodo) expect(hasChildTodo).toBeTruthy();

          const hasChildInProgress = await hasChildTile(
            dashboardPageM,
            dashboardPageM.todoColumn,
            "h3",
            value.verify
          );
          if (hasChildInProgress) expect(hasChildInProgress).toBeTruthy();

          const hasChildReview = await hasChildTile(
            dashboardPageM,
            dashboardPageM.doneColumn,
            "h3",
            value.verify
          );
          if (hasChildReview) expect(hasChildReview).toBeTruthy();

          const hasChildDone = await hasChildTile(
            dashboardPageM,
            dashboardPageM.doneColumn,
            "h3",
            value.verify
          );
          if (hasChildDone) expect(hasChildDone).toBeTruthy();
        }
      );

      testDemo(
        testTitle(+key, `Verify Tags Mobile ${value.navigate}`),
        async ({ dashboardPageM }) => {
          await verifyTags(dashboardPageM, value);
        }
      );
    }
  }
);
