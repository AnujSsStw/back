import { scheduleJob } from "node-schedule";
import { GetData } from "./puppeteer";

scheduleJob("0 */3 * * *", function () {
  console.log("running a task every 3hr");
  GetData();
});
