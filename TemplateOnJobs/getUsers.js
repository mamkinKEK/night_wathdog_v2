import usersDB from './users.json' assert {type: "json"}

async function getUsers(apiKey, callback) {
  const response = await fetch('https://itltest.megapbx.ru/crmapi/v1/users', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey
    }
  })
  const data = await response.json()
  callback(data)
}

function setupTemplate() {
  getUsers("809ad6a1-79bd-4a9e-bacb-e13991c03d31", (data) => {
    console.log((usersDB.blocks[5].elements[0].options));
    data.items.forEach((item) => {
      let user = {
        "text": {
          "type": "plain_text",
          "text": `${item.name} (${item.ext})`
        },
        "value": item.login
      }
      usersDB.blocks[5].elements[0].options.push(user)
    })
    console.log(JSON.stringify(usersDB));
  })
}

export { setupTemplate }