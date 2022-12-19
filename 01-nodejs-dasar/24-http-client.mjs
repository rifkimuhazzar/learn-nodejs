import https from "https";

const endpoint = "https://webhook.site/977adb2b-3df4-4b52-9c25-b417695f043d";
const request = https.request(
  endpoint,

  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },

  (response) => {
    response.addListener("data", (data) => {
      console.info(`Recieve data: ${data.toString()}`);
    });
  }
);

const body = JSON.stringify({
  name: "Rifki",
  role: "Web Developer",
});

request.write(body);
request.end();
