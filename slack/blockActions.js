import { sendMessage } from "./message/sendMessage.js"
import { deleteMessage } from "./message/deleteMessage.js"
import { setUserOnJob, deleteUsersOnJob } from "./../DB/javascript/editUserOnJob.js"
import { setupUsers } from "../api_mf/setupUsers.js"
import dotenv from 'dotenv'
dotenv.config()

function blockActions(body) {
  // console.log(JSON.stringify(body.actions[0].type));
  // console.log(JSON.stringify(body.actions[0].value));

  if (body.actions[0].type === "button") {
    switch (body.actions[0].value) {
      case "onJobsButton":
        console.log(`[blockAction] Incoming event Type: ${body.actions[0].type}`)
        let telnum = body.state.values.input.inputText.value || "none"
        console.log(`[blockAction] Check telnum ${telnum}`);

        if (telnum.match(/^((\+?7|8)[ \-]?)?((\(\d{3}\))|(\d{3}))?([ \-])?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$/gm)) {
          telnum = telnum.replace(/([7-8]*|).*(\d{3}).*(\d{3}).*(\d{2}).*(\d{2}).*/gm, "7$2$3$4$5")
          console.log(`[blockAction] Telnum after replace ${telnum}`);

          let user = body.state.values.actionsStaticSelect.static_select.selected_option.value || "none"
          let date = body.state.values.actionsDateTimePicker.datepicker.selected_date || "none"
          let time = body.state.values.actionsDateTimePicker.timepicker.selected_time || "none"
          console.log(`[blockAction] See the next users param telnum:${telnum}; user:${user}; time:${date} ${time}`);

          console.log(`[blockAction] Send event to "sendMessage"`);
          sendMessage('text', `Выход на смену со следующими параметрами\n{"telnum":"${telnum}", "user":"${user}", "time":"${date} ${time}"}`)

          console.log(`[blockAction] Send event to "setUserOnJob"`);
          let bodyUserToSave = {
            "login": user,
            "telnum": telnum,
            "expirationTime": Date.parse(`${date} ${time}`).toString
          }
          setUserOnJob(bodyUserToSave)

          let bodyUserToMF = {
            "mobile": telnum,
            "mobile_redirect": {
              "enabled": true,
              "forward": true
            }
          }
          setupUsers(process.env.MF_API_KEY, user, bodyUserToMF)

          console.log(`[blockAction] Send event to "deleteMessage". Message: ${body.message.ts}`);
          deleteMessage(body.message.ts)

        } else {
          console.log(`[blockAction][ERROR] Check telnum format. Send error to "sendMessage" with ${telnum}`);
          console.log(`[blockAction] Send event to "sendMessage"`);
          sendMessage('text', `Некорректный формат введённого номера: ${telnum}`)
        }
        break;


      case "exitJobsButton":
        let user = body.state.values.actions.static_select_action.selected_option.value
        let bodyUserToMF = {
          "mobile": "",
          "mobile_redirect": {
            "enabled": false,
            "forward": false
          }
        }

        console.log(`[blockAction] Send event to "deleteUsersOnJob" with user ${user}`);
        deleteUsersOnJob(user)
        console.log(`[blockAction] Send event to "setupUsers". User: ${user}; Body: ${JSON.stringify(bodyUserToMF)}`);
        setupUsers(process.env.MF_API_KEY, user, bodyUserToMF)
        console.log(`[blockAction] Send event to "deleteMessage". Message: ${body.message.ts}`);
        deleteMessage(body.message.ts)

        break;

      default:
        console.log(`[blockActions] Unknown actions. Ignoring`);

        break
    }
  }
}

export { blockActions }