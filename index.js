const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');
const { token } = require('./config.json');

const bot = new Client({intents: [GatewayIntentBits.Guilds,
                                GatewayIntentBits.GuildMessages]});

bot.once(Events.ClientReady, client => {
    console.log(`Bot started : ${client.user.tag}`);
})

bot.on(Events.InteractionCreate, async interaction => {
    /*
    ** This is where you assign your commands to the bot
    */
})

bot.login(token);