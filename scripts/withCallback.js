const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const from = process.env.TWILIO_NUMBER;
const numbers = ["+15017122661"];

const body = `⛈️⚾ Today's game is cancelled due to the rain. 
  Your tickets will be honored at the rescheduled game date.`;

numbers.forEach((to) => {
  twilio.messages.create({
    to,
    from,
    body,
    statusCallback: "https://www.example.com/trackingUrl",
  });
});
