import { test, expect } from "@playwright/test";

test("shortens URL and redirects to original URL", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("urls.wtf");
  await page
    .getByRole("textbox", { name: "Enter an URL to shorten" })
    .fill("https://www.google.com");
  await page.getByRole("button", { name: "Go!" }).click();
  await page.getByRole("button", { name: "copy" }).click();

  const shortenedLink = await page
    .getByRole("link", { name: /http:\/\/localhost:4173/ })
    .textContent();

  expect(shortenedLink).toMatch(/http:\/\/localhost:4173\/u\/[a-zA-Z0-9]+/);

  await page.goto(shortenedLink!);

  await expect(page.getByRole("link", { name: "https://www.google.com" })).toBeVisible();
});
