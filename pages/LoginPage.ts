import { Page } from "@playwright/test";

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get pageTitle() {
    return this.page.locator("h1");
  }
  get usernameInput() {
    return this.page.locator("#username");
  }
  get passwordInput() {
    return this.page.locator("#password");
  }
  get loginButton() {
    return this.page.locator('button[type="submit"]');
  }

  async open(url: string) {
    await this.page.goto(url);
  }

  public async login(email: string, password: string) {
    await this.usernameInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  public async getLoginPageTitle() {
    return await this.pageTitle.innerText();
  }
}
