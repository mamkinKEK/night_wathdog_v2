function setupUsers(apiKey, user, body) {
  fetch(`https://itltest.megapbx.ru/crmapi/v1/users/${user}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey
    },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
  // .then((data) => console.log(JSON.stringify(data)));
}

export { setupUsers }
