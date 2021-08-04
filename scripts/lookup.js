const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const apiQueue = require("queue");

const q = apiQueue({ concurrency: 500 });
const numbers = ["+15017122661"];

// bulk cleanup phone numbers
numbers.forEach((to) => {
  q.push(() => {
    twilio.lookups.v1
      .phoneNumbers(to)
      .fetch()
      .then((number) => console.log(number))
      .catch(() => console.log("Invalid phone number"));
  });
});

q.start();
