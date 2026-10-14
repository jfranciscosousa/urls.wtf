import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { test, expect } from "@playwright/test";

const actionHeaders = {
  origin: "http://localhost:4173",
  "x-sveltekit-action": "true",
  accept: "application/json",
};

test("rejects invalid and missing URLs", async ({ request }) => {
  for (const form of [
    { url: "not a url" },
    { url: "" },
    { url: "http://127.0.0.1" },
    { url: "javascript:alert(1)" },
    {},
  ]) {
    const response = await request.post("/", { headers: actionHeaders, form });
    const result = await response.json();
    expect(result.type).toBe("success");
    expect(JSON.parse(result.data)).toContain("invalid_url");
  }
});

test("normalizes URLs and reuses their short code", async ({ request }) => {
  const results: string[] = [];
  for (const url of ["example.com/effect-v4", "https://example.com/effect-v4"]) {
    const response = await request.post("/", {
      headers: actionHeaders,
      form: { url },
    });
    const result = await response.json();
    const data = JSON.parse(result.data);
    results.push(data.find((value: unknown) => typeof value === "string"));
  }
  expect(results[0]).toMatch(/^http:\/\/localhost:4173\/u\/[a-zA-Z0-9]{8}$/);
  expect(results[1]).toBe(results[0]);
  const destination = await request.get(results[0]!);
  expect(await destination.text()).toContain('href="https://example.com/effect-v4"');
});

test("hides database failures from the form response", async () => {
  const { stdout, stderr } = await promisify(execFile)(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `
        import { createServer } from "vite";
        const server = await createServer({ logLevel: "silent", server: { middlewareMode: true } });
        try {
          const { actions } = await server.ssrLoadModule("/src/routes/+page.server.ts");
          const body = new FormData();
          body.set("url", "https://example.com/database-failure");
          const request = new Request("http://localhost/", { method: "POST", body });
          const result = await actions.default({ request });
          console.log(JSON.stringify(result));
        } finally {
          await server.close();
        }
      `,
    ],
    {
      env: {
        ...process.env,
        DATABASE_URL: "postgres://postgres:postgres@127.0.0.1:1/urls_wtf_test?connect_timeout=1",
      },
      timeout: 15000,
    },
  );
  expect(stderr).toContain("DatabaseError");
  expect(stdout.trim()).toBe(JSON.stringify({ error: "unknown_error" }));
});

test("returns 404 for an unknown code", async ({ request }) => {
  const response = await request.get("/u/unknown-effect-v4-code");
  expect(response.status()).toBe(404);
});

test("shortens URL and shows the destination link", async ({ page }) => {
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
