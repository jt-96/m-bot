//Discord-Player
const { SlashCommandBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Adds a song to play from a url.')
        .addStringOption((option) => option.setName('query').setDescription('Search query or URL').setRequired(true)),

    async execute(interaction) {

        const channel = interaction.member.voice.channel;

        if (!channel) return interaction.reply('You are not connected to a voice channel!');

        const player = useMainPlayer();
        const query = interaction.options.getString('query', true);

        await interaction.deferReply();

        try {
            const { track } = await player.play(channel, query, {
                nodeOptions: {
                    metadata: interaction
                }
            });

            return interaction.followUp(`**${track.title}** added!`);

        } catch (e) {
            return interaction.followUp(`Something went wrong: ${e}`)
        }
    }
}