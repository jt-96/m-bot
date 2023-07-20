const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Mix queue'),

    async execute(interaction) {

        const channel = interaction.member.voice.channel;
        const queue = useQueue(interaction.guild.id);

        if (!channel) return interaction.reply('You are not connected to a voice channel!');
        if (!queue) return interaction.reply('Bot is idle!');

        await interaction.deferReply();

        try {
            queue.tracks.shuffle();

            return interaction.followUp('Playlist shuffled!');

        } catch (e) {
            return interaction.followUp(`Something went wrong: ${e}`);
        }
    }
}