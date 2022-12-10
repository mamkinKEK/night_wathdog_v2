function sendMessage(type, text) {
  let body = {
    "channel": "C047T45GBKJ",
  }
  body[type] = text
  fetch(`https://slack.com/api/chat.postMessage`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SLACK_USER_BOT_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
  // .then((data) => console.log(JSON.stringify(data)));

}

export { sendMessage }