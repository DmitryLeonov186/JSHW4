let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
}, 60000);
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const actual = await page.title();
    const expected =
      "GitHub · Build and ship software on a single, collaborative platform · GitHub";
    expect(actual).toEqual(expected);
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    const expected = "#start-of-content";
    expect(actual).toEqual(expected);
  }, 60000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    const expected = "Get started with Team";
    expect(actual).toContain(expected);
  }, 60000);
});

describe("Task 2", () => {
  test("Test 1", async () => {
    await page.goto("https://github.blog");
    const actual = await page.title();
    const expected = "Home - The GitHub Blog";
    expect(actual).toContain(expected);
  }, 60000);

  test("Test 2", async () => {
    await page.goto("https://github.com/pricing");
    const actual = await page.title();
    const expected = "Pricing · Plans for every developer · GitHub";
    expect(actual).toContain(expected);
  }, 60000);

  test("Test 3", async () => {
    await page.goto("https://github.com/security/advanced-security");
    const h1 = "#hero-section-brand-heading";
    const actual = await page.$eval(h1, (el) => el.textContent);
    const expected = "Security that moves at the  speed of development";
    expect(actual).toEqual(expected);
  }, 60000);
});
