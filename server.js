import dotenv from 'dotenv'
dotenv.config()
import { eventCallback } from "./slack/eventCallback.js";
import { blockActions } from './slack/blockActions.js';
import express, { json } from 'express';
import bodyParser from 'body-parser';

import { alarmClock } from "./alarm_clock/alarm_task.js";
import { clearUsers } from './DB/javascript/clearUsers.js';


const app = express()
// support encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('/', function (req, res) {
  // Encode body to json
  let requestBody = (req.headers['content-type'] === "application/json") ? req.body : JSON.parse(JSON.stringify(req.body).replace(/(\"(\{)|(\})\")/gm, '$2$3').replace(/(\\(\")|(\\)\\)/gm, "$2$3")).payload
  console.log(`[Incoming request] Decoding from: ${req.headers['content-type']}, type request: ${requestBody.type}`);

  // Choose type of incoming request
  switch (requestBody.type) {
    case "event_callback":
      console.log("[Incoming request] Send event to \"eventCallback\"");
      eventCallback(requestBody)
      res.sendStatus(200);
      break;

    case "block_actions":
      console.log("[Incoming request] Send event to \"blockActions\"");
      blockActions(requestBody)
      res.sendStatus(200);
      break;

    case "url_verification":
      console.log("[Incoming request] Url verification with challenge requestBody");
      res.json({ message: requestBody })
      break;

    default:
      console.log(`[Incoming request] Unrecognized message. Body: ${requestBody}`);
      res.sendStatus(404);
      break;
  }
})

app.listen(process.env.PORT, function () {
  console.log(`Serve listening at ${process.env.PORT}`);
})

setInterval(clearUsers, 60000)
setInterval(alarmClock, 900000)
