const { ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");

module.exports =  {
    data : new ContextMenuCommandBuilder()
                .setName("Delete message and warn")
                .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        const msg = interaction.targetMessage;
        const channel = interaction.channel;
        channel.send(`WARNING, Non-conforming message <@${msg.member.id}>`);
        msg.delete();
        
        await interaction.reply({content : "Deleted", ephemeral : true})
    }
};