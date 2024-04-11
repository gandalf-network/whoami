import puppeteer from "puppeteer";

export async function getRottenTomatoScore(title: string) {
  title = title.replaceAll(" ", "_");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(title, {
    waitUntil: "networkidle2",
    timeout: 1000000,
  });

  const score = await page.evaluate(() => {
    return document.querySelector("rt-text[slot='criticsScore']")?.textContent;
  });

  await browser.close();

  return score;
}
