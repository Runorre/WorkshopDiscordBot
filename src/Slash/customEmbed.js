const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js");

module.exports = {
    data : new SlashCommandBuilder()
                .setName("customembed")
                .setDescription("Create a custom embed message"),
    async execute(interaction) {
        const modal = new ModalBuilder()
			.setCustomId('customEmbedModal')
			.setTitle('CustomEmbed');

		const titleEmbed = new TextInputBuilder()
			.setCustomId('titleEmbed')
			.setLabel("Title of embed message")
			.setStyle(TextInputStyle.Short);

		const descriptionEmbed = new TextInputBuilder()
			.setCustomId('descriptionEmbed')
			.setLabel("main message of the embed message")
			.setStyle(TextInputStyle.Paragraph);

		const firstActionRow = new ActionRowBuilder().addComponents(titleEmbed);
		const secondActionRow = new ActionRowBuilder().addComponents(descriptionEmbed);

		modal.addComponents(firstActionRow, secondActionRow);

		await interaction.showModal(modal);
    }
}