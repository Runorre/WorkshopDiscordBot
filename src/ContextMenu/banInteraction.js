const { ContextMenuCommandBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports =  {
    data : new ContextMenuCommandBuilder()
                .setName("Ban User")
                .setType(ApplicationCommandType.User),
    async execute(interaction) {
        const target = interaction.targetUser;
        const confirm = new ButtonBuilder()
            .setCustomId('confirmBan')
            .setLabel('Confirm Ban')
            .setStyle(ButtonStyle.Danger);

        const cancel = new ButtonBuilder()
            .setCustomId('cancelBan')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
        .addComponents(cancel, confirm);

        const response = await interaction.reply({
            content: `Are you sure you want to ban ${target}?`,
            components: [row],
        });
        const collectorFilter = i => i.user.id === interaction.user.id;
        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000});

            if (confirmation.customId === 'confirmBan') {
                await interaction.guild.members.ban(target);
                await confirmation.update({ content: `${target.username} has been banned`, components: [] });
            } else if (confirmation.customId === 'cancelBan') {
                await confirmation.update({ content: 'Action cancelled', components: [] });
            }
        } catch (e) {
            console.error(e);
            await interaction.editReply({ content: "Error", components: [] });
        }
    }
};