import usersOnJobs from './../DB/json/usersOnJobs.json' assert {type: "json"}
import { callUsers } from '../api_mf/callUsers.js';


function alarmClock() {
  let calledUsers = []
  console.log(`[alarmClock] Starting ${Date()}. UsersOnJobs: ${JSON.stringify(usersOnJobs)})}`);
  console.log(calledUsers);
  usersOnJobs.forEach((user) => {
    let body = {
      "phone": "79190700091",
      "user": user.login
    }
    let apiKey = "809ad6a1-79bd-4a9e-bacb-e13991c03d31"
    console.log(`[alarmClock] Call user ${user.login}`);
    callUsers(apiKey, body)
    console.log(`[alarmClock] Send event to "sendMessage"`);
    sendMessage('text', `Звонок сотруднику ${user.login}`)
  })
}

export { alarmClock }