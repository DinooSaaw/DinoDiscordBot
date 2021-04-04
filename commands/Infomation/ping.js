module.exports = {
    name: "ping",
    category: "Fun",
  run: async (client, message, args) => {
    let msg = await message.channel.send(`Pinging`)
    setTimeout(() => {
        msg.edit("Pinging.")
    }, 1000);
    setTimeout(() => {
        msg.edit("Pinging..")
    }, 2000);
    setTimeout(() => {
        msg.edit("Pinging...")
    }, 3000);
    setTimeout(() => {
        msg.edit("Pinging.")
    }, 4000);
    setTimeout(() => {
        msg.edit("Pinging..")
    }, 5000);
    setTimeout(() => {
        msg.edit("Pinging...")
    }, 6000);
    setTimeout(() => {
        msg.edit(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
    }, 7000); 
  }
}