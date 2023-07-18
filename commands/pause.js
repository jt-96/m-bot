const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses current audio playback.'),

    async execute(interaction) {
        const channel = interaction.member.voice.channel;
        const queue = useQueue(interaction.guild.id);

        if (!channel) return interaction.reply('You are not connected to a voice channel!');
        if (!queue) return interaction.reply('Queue empty/Bot is idle!');

        await interaction.deferReply();

        try {
            queue.node.setPaused(true);
            return interaction.followUp('Playback paused!');
        } catch (e) {
            return interaction.followUp(`Something went wrong: ${e}`);
        }
    }
}