// callback
// setInterval(() => {
//   console.info(`Start time at ${new Date()}`);
// }, 1000);

// promises
import timers from "timers/promises";

// console.info(new Date());
// const date = await timers.setTimeout(3000, "Rifki");
// console.info(new Date());
// console.info(date);

for await (const startTime of timers.setInterval(1000)) {
  console.info(`Start ${new Date()}`);
}
