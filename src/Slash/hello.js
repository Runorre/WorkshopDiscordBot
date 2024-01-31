const { SlashCommandBuilder } = require("discord.js");

module.exports =  {
    data : new SlashCommandBuilder()
                .setName("hello")
                .setDescription("Hello world")
                .addChannelOption(option =>
                    option
                        .setName("where")
                        .setDescription("where message to show")
                        .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel("where");
        
        await interaction.reply("Hello world !")
    }
};