import { Page, Locator } from "@playwright/test";

export class DashboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get todoColumn() {
    // I don't like using xpath like this, and I would ask developers to add an
    // attribute or test-id to make this easier to find for testing purposes.
    // I've worked with React and would happily assist in adding necessary target test ids
    // to the app
    // that said this works for what I need tto get the task done
    // return this.page.locator(
    //   "//div[contains(@class, 'w-80')][.//span[contains(@class, 'bg-red-100')]]"
    // ); // todo column
    return this.page.locator('//*[@id="root"]/div/div[2]/main/div/div/div[1]');
  }

  get inProgressColumn() {
    return this.page.locator('//*[@id="root"]/div/div[2]/main/div/div/div[2]'); // in progress column
  }
  get doneColumn() {
    return this.page.locator('//*[@id="root"]/div/div[2]/main/div/div/div[4]'); // done column
  }
  get reviewColumn() {
    return this.page.locator('//*[@id="root"]/div/div[2]/main/div/div/div[3]'); // done column
  }
  get webAppButton() {
    return this.page.locator('//*[@id="root"]/div/div[1]/nav/button[1]');
  }
  get mobileAppButton() {
    return this.page.locator('//*[@id="root"]/div/div[1]/nav/button[2]');
  }
  get logoutButton() {
    return this.page.getByRole("button").filter({ hasText: "Logout" });
  }
  get pageTitleWeb() {
    return this.page.locator(`h1:text("Web Application")`);
  }
  get pageTitleMobile() {
    return this.page.locator(`h1:text("Mobile Application")`);
  }

  public tags(tagText: string) {
    return this.page.locator(`span`);
  }
}
