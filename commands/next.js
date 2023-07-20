const { SlashCommandBuilder } = require('discord.js');
const { useHistory, useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('next')
        .setDescription('Skips current track on playlist'),

    async execute(interaction) {
        const channel = interaction.member.voice.channel;
        const queue = useQueue(interaction.guild.id);
        const history = useHistory(interaction.guild.id);

        if (!channel) return interaction.reply('You are not connected to a voice channel!');
        if (!queue) return interaction.reply('Queue empty/Idle Bot!');

        await interaction.deferReply();


        try {

            await queue.node.skip();

            return interaction.followUp('Skipping track!');
        } catch (e) {
            return interaction.followUp(`Something went wrong: ${e}`);
        }

    }
}