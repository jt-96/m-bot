const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('Get the current queue of songs'),

    async execute(interaction) {

        const channel = interaction.member.voice.channel;
        const queue = useQueue(interaction.guild.id);

        if (!channel) return interaction.reply('You are not connected to a voice channel!');
        if (!queue) return interaction.reply('Bot is idle!');

        await interaction.deferReply();

        try {
            
            if (queue.isEmpty()) {
                return interaction.followUp('Queue is empty!')
            }

            const tracks = queue.tracks.toArray();
            const totalPages = Math.ceil(tracks.length / 10) || 1
            const page = (interaction.options.getNumber("page") || 1) - 1

            if (page > totalPages)
                return await interaction.editReply(`Invalid Page. There are only a total of ${totalPages} pages of songs`)

            const queueString = tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
                return `**${page * 10 + i + 1}.** \`${song.author} - ${song.title} [${song.duration}] \``
            }).join("\n")

            return interaction.followUp(queueString)

        } catch (e) {
            return interaction.followUp(`Something went wrong: ${e}`);
        }
    }
}