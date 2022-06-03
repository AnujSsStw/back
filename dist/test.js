"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
console.log("Hello");
const getData = async (page2) => {
    const img2 = await page2.evaluate(() => {
        const image = document.querySelectorAll("#block-itg-widget-home-page-feature > div > div.featured-post.featured-post-first > a > img");
        const url = Array.from(image).map((x) => x.src);
        return url[0];
    });
    const headline2 = await page2.evaluate(() => {
        const headline = document.querySelectorAll("#block-itg-widget-home-page-feature > div > div.featured-post.featured-post-first > h2 > a");
        return Array.from(headline).map((x) => x.title)[0];
    });
    const IndiaToday = {
        headline: headline2,
        img: img2,
    };
    console.log(IndiaToday);
    return IndiaToday;
};
exports.getData = getData;
//# sourceMappingURL=test.js.map