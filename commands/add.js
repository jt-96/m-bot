//Discord-Player
const { SlashCommandBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Adds a song to play from a url.')
        .addStringOption((option) => option.setName('query').setDescription('Search query or URL').setRequired(true)),

    async execute(interaction) {

        const channel = interaction.member.voice.channel;
        if (!channel) return interaction.reply('You are not connected to a voice channel!');

        const player = useMainPlayer();
        const queue = player.nodes.create(channel);
        const query = interaction.options.getString('query', true);

        await interaction.deferReply();

        try {

            const searchResult = await player.search(query, { requestedBy: interaction.user, searchEngine: 'youtubeSearch' });

            if (searchResult.hasPlaylist()) {

                queue.addTrack(searchResult.playlist);
                return interaction.followUp(`Playlist **${searchResult.playlist.title}** added!`);

            } else if (searchResult.hasTracks()) {

                queue.addTrack(searchResult.tracks[0]);
                return interaction.followUp(`**${queue.tracks.toArray()[queue.tracks.toArray().length - 1].author} - ${queue.tracks.toArray()[queue.tracks.toArray().length - 1].title}** added!`);
            }

        } catch (e) {
            return interaction.followUp(`Something went wrong: ${e}`)
        }
    }
}