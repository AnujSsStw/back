"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetData = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const sendData_1 = require("./sendData");
const GetData = async () => {
    const browser = await puppeteer_1.default.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page1 = await browser.newPage();
    page1.setDefaultTimeout(0);
    const page2 = await browser.newPage();
    page2.setDefaultTimeout(0);
    await page1.goto("https://www.news18.com/");
    await page2.goto("https://www.indiatoday.in/");
    const img1 = await page1.evaluate(() => {
        const image = document.querySelectorAll("#__next > div.jsx-368370242.home_wrapper > div:nth-child(1) > div > div.jsx-368370242.left_row > div.jsx-3107391233.top_story > div.jsx-3107391233.top_story_left > div > figure > a:nth-child(1) > img");
        const url = Array.from(image).map((x) => x.src);
        return url[0];
    });
    const headline1 = await page1.evaluate(() => {
        const headline = document.querySelectorAll("#__next > div.jsx-368370242.home_wrapper > div:nth-child(1) > div > div.jsx-368370242.left_row > div.jsx-3107391233.top_story > div.jsx-3107391233.top_story_left > div > figure > a.jsx-3107391233.head_story_title > figcaption > h1");
        return Array.from(headline).map((x) => x.textContent)[0];
    });
    const News_18 = {
        headline: headline1,
        img: img1,
    };
    const img2 = await page2.evaluate(() => {
        const image = document.querySelectorAll("#block-itg-widget-home-page-feature > div > div.featured-post.featured-post-first > a > img");
        const url = Array.from(image).map((x) => x.src);
        return url[0];
    });
    const headline2 = await page2.evaluate(() => {
        const headline = document.querySelectorAll("#block-itg-widget-home-page-feature > div > div.featured-post.featured-post-first > h2 > a");
        return Array.from(headline).map((x) => x.title)[0];
    });
    await browser.close();
    (0, sendData_1.firebase)(News_18, { headline: headline2, img: img2 });
};
exports.GetData = GetData;
//# sourceMappingURL=puppeteer.js.map