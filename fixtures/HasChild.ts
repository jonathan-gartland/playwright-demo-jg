import { Locator, Page } from "@playwright/test";
import { DashboardPage } from "@/pages/DashBoardPage";

export async function hasChildTag(
  dashboardPage: DashboardPage,
  parent: Locator,
  element: string,
  tag: string
): Promise<boolean> {
  const childTag = await dashboardPage.getColumnChildTag(parent, element, tag);
  return (await childTag.count()) > 0;
}

export async function hasChildTile(
  dashboardPage: DashboardPage,
  parent: Locator,
  tag: string,
  text: string
): Promise<boolean> {
  const childTile = await dashboardPage.getColumnChildTile(parent, tag, text);
  return (await childTile.count()) > 0;
}
