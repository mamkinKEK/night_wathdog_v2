import fs from 'fs';

function writeFile(body) {
  fs.writeFileSync('./DB/json/usersOnJobs.json', JSON.stringify(body))
}

function getUserOnJob() {
  return JSON.parse(fs.readFileSync('./DB/json/usersOnJobs.json'))
}

// body waiting object {"login":"","telnum":"","expirationTime":""}
function setUserOnJob(body) {
  if (body.login && body.telnum && body.expirationTime) {
    let users = getUserOnJob()

    users.push(body)
    writeFile(users)
  }
}

function deleteUsersOnJob(user) {
  let users = getUserOnJob()

  for (let i in users) {
    if (users[i].login === user) {
      users.splice(i, 1)
    }
  }
  writeFile(users)
}

export { getUserOnJob, deleteUsersOnJob, setUserOnJob }