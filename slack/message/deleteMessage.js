function deleteMessage(ts) {
  let body = {
    "channel": "C047T45GBKJ",
    "ts": ts
  }
  fetch(`https://slack.com/api/chat.delete`, {
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

export { deleteMessage }