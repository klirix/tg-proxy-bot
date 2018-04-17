const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');
var argv = require('minimist')(process.argv.slice(2),{
  alias:{
    p: "port",
    t: "token",
    h: "host"
  }
});

const { token, host, port } = argv;

console.log("Enter password for current user: ")
exec("ssh -D "+port+" -f -C -q -N $(whoami)@localhost &",(err, stdout, stderr)=>{
  console.log(stdout)
})

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg, match) => {
  bot.sendMessage(msg.chat.id, "Here you go! Just press the button and you're ready to go!", {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{text: "Setup Proxy", url: "https://t.me/socks?server="+host+"&port="+port}]
      ]
    })
  });
});