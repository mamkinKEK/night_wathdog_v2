import { setupOnJobsTemplate, setupExitJobsTemplate, setupHelpTemplate } from './setupTemplate.js'
import { getUserOnJob } from './../DB/javascript/editUserOnJob.js'
import dotenv from 'dotenv'
import { sendMessage } from './message/sendMessage.js'
dotenv.config()

function eventCallback(message) {
  const bodyTextString = message.event.text || ""

  switch (bodyTextString.replace(/^\s*<.+>\s*(.+)/gm, "$1").toLowerCase()) {
    case "на смену":
    case "на работу":
      console.log('[eventCallback] Send event to \"setupOnJobsTemplate\"');
      setupOnJobsTemplate(process.env.MF_API_KEY)
      break

    case "кто на смене":
    case "кто на работе":
      let users = getUserOnJob()
      let outUsers = ''
      users.forEach(element => {
        outUsers += JSON.stringify(element)
      });

      console.log('[eventCallback] Send event to \"sendMessage\"');
      sendMessage("text", `Сотрудники на смене:\n${outUsers}`)
      break

    case "уйти со смены":
    case "уйти с работы":
      console.log('[eventCallback] Send event to \"setupTemplate\"');
      setupExitJobsTemplate()
      break

    case "help":
    case "справка":
      console.log('[eventCallback] Send event to \"setupTemplate\"');
      setupHelpTemplate()
      break
  }
}



export { eventCallback }