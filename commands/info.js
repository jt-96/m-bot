const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Gives info about current track!'),

    async execute(interaction) {

        const queue = useQueue(interaction.guild.id);

        if (!queue) return interaction.reply('Queue empty/Bot idle!');

        await interaction.deferReply();

        try {

            const currentTrack = queue.currentTrack; //Gets the current track being played
            return interaction.followUp(`Current song is ${currentTrack}`);

        } catch (e) {
            return interaction.followUp(`Something went wrong: ${e}`);
        }
    }
}