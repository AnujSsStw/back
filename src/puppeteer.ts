import puppeteer from "puppeteer";
import { firebase } from "./sendData";

export const GetData = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // go to page
  const page1 = await browser.newPage();
  page1.setDefaultTimeout(0);
  const page2 = await browser.newPage();
  page2.setDefaultTimeout(0);

  await page1.goto("https://www.news18.com/");
  await page2.goto("https://www.indiatoday.in/");

  // get data from page1
  const img1 = await page1.evaluate(() => {
    const image = document.querySelectorAll(
      "#__next > div.jsx-368370242.home_wrapper > div:nth-child(1) > div > div.jsx-368370242.left_row > div.jsx-3107391233.top_story > div.jsx-3107391233.top_story_left > div > figure > a:nth-child(1) > img"
    ) as NodeListOf<HTMLImageElement>;

    const url = Array.from(image).map((x) => x.src);

    return url[0];
  });

  const headline1 = await page1.evaluate(() => {
    const headline = document.querySelectorAll(
      "#__next > div.jsx-368370242.home_wrapper > div:nth-child(1) > div > div.jsx-368370242.left_row > div.jsx-3107391233.top_story > div.jsx-3107391233.top_story_left > div > figure > a.jsx-3107391233.head_story_title > figcaption > h1"
    );
    return Array.from(headline).map((x) => x.textContent)[0];
  });

  const News_18 = {
    headline: headline1,
    img: img1,
  };

  // get data from page2
  const img2 = await page2.evaluate(() => {
    const image = document.querySelectorAll(
      "#block-itg-widget-home-page-feature > div > div.featured-post.featured-post-first > a > img"
    ) as NodeListOf<HTMLImageElement>;
    const url = Array.from(image).map((x) => x.src);

    return url[0];
  });

  const headline2 = await page2.evaluate(() => {
    const headline = document.querySelectorAll(
      "#block-itg-widget-home-page-feature > div > div.featured-post.featured-post-first > h2 > a"
    ) as NodeListOf<HTMLAnchorElement>;
    return Array.from(headline).map((x) => x.title)[0];
  });

  await browser.close();

  firebase(News_18, { headline: headline2, img: img2 });
};
