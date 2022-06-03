import { scheduleJob } from "node-schedule";
import { GetData } from "./puppeteer";

scheduleJob("* * * * *", function () {
  console.log("running a task every minute");
  GetData();
});
