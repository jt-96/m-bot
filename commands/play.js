const { SlashCommandBuilder } = require('discord.js');
const { useQueue, useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Continues current audio playback.'),

    async execute(interaction) {
        const channel = interaction.member.voice.channel;
        const queue = useQueue(interaction.guild.id);

        if (!channel) return interaction.reply('You are not connected to a voice channel!');
        if (!queue) return interaction.reply('Queue empty/Bot is idle!');

        await interaction.deferReply();

        try {

            if (queue.isPlaying()) {

                return interaction.followUp('Playback already ongoing!');
                
            } else {

                await queue.connect(channel);
                await queue.node.play();
                return interaction.followUp(`Starting playback!`);
            }

        } catch (e) {
            return interaction.followUp(`Something went wrong: ${e}`);
        }
    }
}