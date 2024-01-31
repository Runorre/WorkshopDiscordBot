const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require('./config.json');
const hello = require('./src/Slash/hello'); 
const broadcast = require('./src/Slash/broadcast');
const deletemsg = require('./src/ContextMenu/deleteMsg');

const bot = new Client({intents: [GatewayIntentBits.Guilds,
                                GatewayIntentBits.GuildMessages]});

bot.once(Events.ClientReady, client => {
    console.log(`Bot started : ${client.user.tag}`);
})

bot.on(Events.InteractionCreate, interaction => {
    if (interaction.commandName == "hello") {
        hello.execute(interaction);
    }
    if (interaction.commandName == "broadcast") {
        broadcast.execute(interaction);
    }
    if (interaction.commandName == "Delete message and warn")
        deletemsg.execute(interaction);
})

bot.login(token);