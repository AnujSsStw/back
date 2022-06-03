"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_schedule_1 = require("node-schedule");
const puppeteer_1 = require("./puppeteer");
(0, node_schedule_1.scheduleJob)("0 */3 * * *", function () {
    console.log("running a task every 3hr");
    (0, puppeteer_1.GetData)();
});
//# sourceMappingURL=index.js.map