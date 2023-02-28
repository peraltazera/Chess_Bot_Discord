const { SlashCommandBuilder } = require('discord.js')
const server = require('../data/data_base.js')
const FeedBack = require('../game/feedback.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Finaliza a partida!'),
	async execute(interaction) {
        const lobby = server.lobbyes.find(lobby => lobby.id == interaction.channelId+interaction.guildId)
        if(lobby){
            lobby.myInteraction.deleteReply()
            server.lobbyes.splice(server.lobbyes.indexOf(lobby), 1)
            FeedBack.CreateFeedback(interaction, `Jogo Finalizado!`, false, 5)
            console.log(server.lobbyes)
        }
        else
        {
            await interaction.reply(`Erro!`)
        }
	},
}