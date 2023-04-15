const { SlashCommandBuilder } = require('discord.js')
const server = require('../data/data_base.js')
const FeedBack = require('../game/feedback.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('recuperar')
		.setDescription('Recuperar partida em andamento'),
	async execute(interaction) {
        let lobby = server.lobbyes.find(lobby => lobby.id == interaction.channelId+interaction.guildId)
        if(lobby)
        {
            if(lobby.myInteraction){
                lobby.myInteraction.deleteReply()
            }
            await interaction.reply({ files: [lobby.attachment] })
            lobby.myInteraction = interaction
            const message = await interaction.fetchReply()
            lobby.messageId = message.id
        }
        else
        {
            FeedBack.CreateFeedback(interaction, `Não existe partida para se recuperar!`, true, 5)
        }
	},
}