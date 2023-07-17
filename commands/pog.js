const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pog')
        .setDescription('Pogs with you.'),

    async execute(interaction) {
        await interaction.reply('Pog indeed, sips tea...');
    }
}