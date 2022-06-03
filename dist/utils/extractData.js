"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractData = void 0;
const extractData = async (page) => {
    const img = await page.evaluate(() => {
        const image = document.querySelectorAll("#__next > div.jsx-368370242.home_wrapper > div:nth-child(1) > div > div.jsx-368370242.left_row > div.jsx-3107391233.top_story > div.jsx-3107391233.top_story_left > div > figure > a:nth-child(1) > img");
        const url = Array.from(image).map((x) => x.src);
        return url;
    });
    const headline = await page.evaluate(() => {
        const headline = document.querySelectorAll("#__next > div.jsx-368370242.home_wrapper > div:nth-child(1) > div > div.jsx-368370242.left_row > div.jsx-3107391233.top_story > div.jsx-3107391233.top_story_left > div > figure > a.jsx-3107391233.head_story_title > figcaption > h1");
        return Array.from(headline).map((x) => x.textContent);
    });
    return headline[0], img;
};
exports.extractData = extractData;
//# sourceMappingURL=extractData.js.map