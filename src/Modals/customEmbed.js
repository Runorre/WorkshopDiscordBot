const { EmbedBuilder } = require("discord.js");

module.exports = {
    data : {name : "customEmbedModal"},
    async execute(interaction) {
        const titleEmbed = interaction.fields.getTextInputValue('titleEmbed');
	    const descriptionEmbed = interaction.fields.getTextInputValue('descriptionEmbed');

        const embded = new EmbedBuilder()
                        .setTitle(titleEmbed)
                        .setDescription(descriptionEmbed)
        await interaction.reply({embeds : [embded]})
    }
}