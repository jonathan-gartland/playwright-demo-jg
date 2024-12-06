import { Locator, Page } from "@playwright/test";

export async function hasChildTag(
  parent: Locator,
  page: Page,
  tag: string,
  element: string
): Promise<boolean> {
  return (
    (await parent
      .filter({
        has: page.locator(`${element}:text("${tag}")`),
      })
      .count()) > 0
  );
}

export async function hasChildTile(
  parent: Locator,
  page: Page,
  tag: string,
  text: string
): Promise<boolean> {
  return (
    (await parent
      .filter({
        has: page.locator(`${tag}:text("${text}")`),
      })
      .count()) > 0
  );
}
