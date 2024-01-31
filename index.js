const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');
const { token } = require('./config.json');

//! BAD METHOD
const hello = require('./src/Slash/hello'); 
const broadcast = require('./src/Slash/broadcast');
const deletemsg = require('./src/ContextMenu/deleteMsg');
const banMenu = require('./src/ContextMenu/banInteraction');
const pkmnChoose = require("./src/Slash/starter");
const modalEmbed = require("./src/Modals/customEmbed");

const bot = new Client({intents: [GatewayIntentBits.Guilds,
                                GatewayIntentBits.GuildMessages]});

bot.once(Events.ClientReady, client => {
    console.log(`Bot started : ${client.user.tag}`);
})

//* FAIT PARTIE DE LA BONNE METHODE
bot.commands = new Collection();
const foldersPath = path.join(__dirname, 'src');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
    // if (folder === 'Modals') continue;
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			bot.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

bot.on(Events.InteractionCreate, async interaction => {

    //TODO DO BETTER METHOD
    if (interaction.isModalSubmit()) {
            if (interaction.customId == modalEmbed.data.name)
                modalEmbed.execute(interaction);
        return;
    }

    //* GOOD METHOD
    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}


    //! BAD METHOD
    // switch (interaction.commandName) {
    //     case "hello":
    //         hello.execute(interaction);
    //         break;
    //     case "broadcast":
    //         broadcast.execute(interaction);
    //         break;
    //     case "Delete message and warn":
    //         deletemsg.execute(interaction);
    //         break;
    //     case "Ban User":
    //         banMenu.execute(interaction);
    //         break;
    //     case "starter":
    //         pkmnChoose.execute(interaction);
    //         break;
    //     default:
    //         break;
    // }
})

bot.login(token);