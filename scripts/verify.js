const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const service = twilio.verify.services(process.env.VERIFY_SERVICE_SID);

service.verifications
  .create({
    to: "+15017122661",
    channel: "sms",
  })
  .then((resp) => console.log(resp.status));
