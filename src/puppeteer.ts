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
  const data1 = await page1.evaluate(() => {
    const image = document.querySelectorAll(
      "#__next > div.jsx-368370242.home_wrapper > div:nth-child(1) > div > div.jsx-368370242.left_row > div.jsx-3107391233.top_story > div.jsx-3107391233.top_story_left > div > figure > a:nth-child(1) > img"
    ) as NodeListOf<HTMLImageElement>;
    const url = Array.from(image).map((x) => x.src)[0];

    const headline = document.querySelectorAll(
      "#__next > div.jsx-368370242.home_wrapper > div:nth-child(1) > div > div.jsx-368370242.left_row > div.jsx-3107391233.top_story > div.jsx-3107391233.top_story_left > div > figure > a.jsx-3107391233.head_story_title > figcaption > h1"
    );
    const headline1 = Array.from(headline).map((x) => x.textContent)[0];

    const link = document.querySelectorAll(
      "#__next > div.jsx-368370242.home_wrapper > div:nth-child(1) > div > div.jsx-368370242.left_row > div.jsx-3107391233.top_story > div.jsx-3107391233.top_story_left > div > figure > a.jsx-3107391233.head_story_title"
    ) as NodeListOf<HTMLAnchorElement>;
    const link1 = Array.from(link).map((x) => x.href)[0];

    return { url, headline1, link1 };
  });

  const News_18 = {
    headline: data1.headline1,
    img: data1.url,
    link: data1.link1,
  };

  // get data from page2
  const date2 = await page2.evaluate(() => {
    const image = document.querySelectorAll(
      "#block-itg-widget-home-page-feature > div > div.featured-post.featured-post-first > a > img"
    ) as NodeListOf<HTMLImageElement>;
    const url = Array.from(image).map((x) => x.src)[0];

    const headline = document.querySelectorAll(
      "#block-itg-widget-home-page-feature > div > div.featured-post.featured-post-first > h2 > a"
    ) as NodeListOf<HTMLAnchorElement>;
    const headline1 = Array.from(headline).map((x) => x.title)[0];

    const link = document.querySelectorAll(
      "#block-itg-widget-home-page-feature > div > div.featured-post.featured-post-first > h2 > a"
    ) as NodeListOf<HTMLAnchorElement>;
    const link1 = Array.from(link).map((x) => x.href)[0];

    return { url, headline1, link1 };
  });

  const IndiaToday = {
    headline: date2.headline1,
    img: date2.url,
    link: date2.link1,
  };

  await browser.close();

  firebase(News_18, IndiaToday);
};
