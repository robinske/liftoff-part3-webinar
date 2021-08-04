const crypto = require("crypto");
const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const body = `⛈️⚾ Today's game is cancelled due to the rain. 
  Your tickets will be honored at the rescheduled game date.`;

const service = twilio.notify.services(process.env.NOTIFY_SERVICE_SID);

const numbers = ["+15017122661"];

const bindings = numbers.map((number) => {
  const identity = crypto.createHash("sha256").update(number).digest("hex");
  return JSON.stringify({
    identity,
    bindingType: "sms",
    address: number,
  });
});

// 1 mb request limit
service.notifications
  .create({
    toBinding: bindings,
    body,
  })
  .then((resp) => console.log(resp.sid));
