const { SlashCommandBuilder } = require('discord.js');
const { useHistory, useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('back')
        .setDescription('Goes back a track on a playlist'),

    async execute(interaction) {
        const channel = interaction.member.voice.channel;
        const queue = useQueue(interaction.guild.id);
        const history = useHistory(interaction.guild.id);

        if (!channel) return interaction.reply('You are not connected to a voice channel!');
        if (!queue) return interaction.reply('Queue empty/Idle Bot!');

        await interaction.deferReply();


        try {

            await history.previous();

            return interaction.followUp('Going back a track!');
        } catch (e) {
            return interaction.followUp(`Something went wrong: ${e}`);
        }

    }
}