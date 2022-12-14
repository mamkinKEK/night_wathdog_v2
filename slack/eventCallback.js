import { setupOnJobsTemplate, setupExitJobsTemplate } from './setupTemplate.js'
import { getUserOnJob } from './../DB/javascript/editUserOnJob.js'
import dotenv from 'dotenv'
import { sendMessage } from './message/sendMessage.js'
dotenv.config()

function eventCallback(message) {
  const bodyTextString = message.event.text || ""

  switch (bodyTextString.replace(/^\s*<.+>\s*(.+)/gm, "$1")) {
    case "на смену":
    case "на работу":
    case "На смену":
    case "На работу":
      console.log('[eventCallback] Send event to \"setupOnJobsTemplate\"');
      setupOnJobsTemplate(process.env.MF_API_KEY)
      break

    case "кто на смене":
    case "Кто на смене":
    case "кто на работе":
    case "Кто на работе":
      let users = getUserOnJob()
      let outUsers = ''
      users.forEach(element => {
        outUsers += JSON.stringify(element)
      });

      console.log('[eventCallback] Send event to \"sendMessage\"');
      sendMessage("text", `Сотрудники на смене:\n${outUsers}`)
      break

    case "уйти со смены":
    case "Уйти со смены":
    case "уйти с работы":
    case "Уйти с работы":
      console.log('[eventCallback] Send event to \"setupTemplate\"');
      setupExitJobsTemplate()
      break
  }
}



export { eventCallback }