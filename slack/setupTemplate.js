import { sendMessage } from './message/sendMessage.js'
import { getUserOnJob } from './../DB/javascript/editUserOnJob.js'
import onJobsTemplate from './templates/templateOnJobs.json' assert {type: "json"}
import exitJobsTemplate from './templates/templateExitJobs.json' assert {type: "json"}
import { getUsers } from './../api_mf/getUsers.js'

function setupOnJobsTemplate(apiKey) {
  getUsers(apiKey, (data) => {
    data.items.forEach((item) => {
      let user = {
        "text": {
          "type": "plain_text",
          "text": `${item.name} (${item.ext})`
        },
        "value": item.login
      }
      onJobsTemplate.blocks[5].elements[0].options.push(user)
    })
    console.log('[setupOnJobsTemplate] Send event to \"SendMessage\"');
    sendMessage("blocks", onJobsTemplate.blocks)
  })
}

function setupExitJobsTemplate() {
  let users = getUserOnJob()
  users.forEach((item) => {
    let user = {
      "text": {
        "type": "plain_text",
        "text": item.login
      },
      "value": item.login
    }
    exitJobsTemplate.blocks[1].elements[0].options.push(user)
  })
  console.log('[setupExitJobsTemplate] Send event to \"SendMessage\"');
  sendMessage("blocks", exitJobsTemplate.blocks)
}

export { setupOnJobsTemplate, setupExitJobsTemplate }