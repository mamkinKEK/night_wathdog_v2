import { getUserOnJob, deleteUsersOnJob } from './editUserOnJob.js'

function clearUsers() {
  let users = getUserOnJob()
  let dateNow = Date.now()
  console.log(`[clearUsers] Check DB: ${JSON.stringify(users)}; Date now: ${dateNow}`);
  if (users.length > 0) {
    console.log(`[clearUsers] Check users to clear`);
    users.forEach((user) => {
      if (user.expirationTime < dateNow) {
        console.log(`[clearUsers] Delete user: "${user.login}". Status: "End of work time"`);
        deleteUsersOnJob(user.login)
      } else {
        console.log(`[clearUsers] User ${user.login} check status: normal.`);
      }
    })
  } else {
    console.log(`[clearUsers] Nobody onJobs`);
  }
}

export { clearUsers }