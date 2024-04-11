import puppeteer from "puppeteer";

import { ROTTEN_TOMATOES_BASE_URL } from "@/actions/helpers/constants";

export async function getRottenTomatoScore(title: string) {
  title = title.replaceAll(" ", "_");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${ROTTEN_TOMATOES_BASE_URL}/tv/${title}`, {
    waitUntil: "networkidle2",
    timeout: 1000000,
  });

  const score = await page.evaluate(() => {
    return document.querySelector("rt-text[slot='criticsScore']")?.textContent;
  });

  await browser.close();

  return score;
}
