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

export { getUsers }