const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports =  {
    data : new SlashCommandBuilder()
                .setName("broadcast")
                .setDescription("send a message in specifique channel")
                .addChannelOption(option =>
                    option
                        .setName("where")
                        .setDescription("where message to show")
                        .setRequired(true))
                .addStringOption(option => 
                        option
                        .setName("content")
                        .setDescription("content of message")
                        .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel("where");
        const msg = interaction.options.getString("content");
        console.log(msg)
        const embded = new EmbedBuilder()
                        .setTitle("Broadcast")
                        .setDescription(msg)
        await channel.send({embeds : [embded]})
        await interaction.reply({content : "Send it !", ephemeral : true})
    }
};