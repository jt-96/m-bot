const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vol')
        .setDescription('Sets the volume of the player.')
        .addNumberOption((option) => option.setName('percent').setDescription('Volume amount to set').setRequired(true).setMinValue(0).setMaxValue(100)),

    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        const channel = interaction.member.voice.channel;
        const volume = interaction.options.getNumber('percent');

        if (!channel) return interaction.reply('You are not connected to a voice channel!');

        await interaction.deferReply();

        try {
            queue.node.setVolume(volume);

            return interaction.followUp(`Volume set to: ${volume} %`);

        } catch (e) {
            return interaction.followUp(`Something went wrong: ${e}`);
        }
    }
}