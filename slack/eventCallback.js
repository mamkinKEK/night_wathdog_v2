import { setupOnJobsTemplate, setupExitJobsTemplate } from './setupTemplate.js'
import { getUserOnJob } from './../DB/javascript/editUserOnJob.js'
import dotenv from 'dotenv'
import { sendMessage } from './message/sendMessage.js'
dotenv.config()

function eventCallback(message) {
  const bodyTextString = message.event.text || ""

  if (bodyTextString.search(/на смену/i) > 0) {
    console.log('[eventCallback] Send event to \"setupOnJobsTemplate\"');
    setupOnJobsTemplate(process.env.MF_API_KEY)
  }

  if (bodyTextString.search(/кто на смене/i) > 0) {
    let users = getUserOnJob()
    let outUsers = ''
    users.forEach(element => {
      outUsers += JSON.stringify(element)
    });

    console.log('[eventCallback] Send event to \"sendMessage\"');
    sendMessage("text", `Сотрудники на смене:\n${outUsers}`)
  }
  if (bodyTextString.search(/уйти со смены/i) > 0) {
    console.log('[eventCallback] Send event to \"setupTemplate\"');
    setupExitJobsTemplate()
  }
}



export { eventCallback }