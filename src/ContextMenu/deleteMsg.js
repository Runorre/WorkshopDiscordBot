const { ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");

module.exports =  {
    data : new ContextMenuCommandBuilder()
                .setName("Delete message and warn")
                .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        const msg = interaction.targetMessage;
        const channel = interaction.channel;

        msg.delete();
        channel.send("WARNING, message not conform");
        await interaction.reply({content : "Deleted", ephemeral : true})
    }
};