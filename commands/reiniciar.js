const { SlashCommandBuilder } = require('discord.js')
const server = require('../data/data_base.js')
const jsChessEngine = require('js-chess-engine')
const Board = require('../game/board.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reiniciar')
		.setDescription('Reiniciar a partida'),
	async execute(interaction) {
        let lobby = server.lobbyes.find(lobby => lobby.id == interaction.channelId+interaction.guildId)
        if(lobby){
            if(lobby.myInteraction){
                lobby.myInteraction.deleteReply()
            }
            const game = new jsChessEngine.Game()
            server.lobbyes.push(new server.lobby(interaction.channelId+interaction.guildId,
                interaction.channelId, interaction.guildId, 
                { id: lobby.player1.id, username: lobby.player1.username, turn: true  }, 
                { id: lobby.player2.id, username: lobby.player2.username, turn: false  }, 
                lobby.myInteraction, 
                lobby.difficulty,
                game,
                '',
                lobby.ai,
                lobby.messageId))
            server.lobbyes.splice(server.lobbyes.indexOf(lobby), 1)
            lobby = server.lobbyes.find(lobby => lobby.id == interaction.channelId+interaction.guildId)
            const attachment = await Board.CreateBoard(null, null, null, null, null, null, lobby)
            await interaction.reply({ files: [attachment] })
            lobby.myInteraction = interaction
            const message = await interaction.fetchReply()
            lobby.messageId = message.id
        }
        else
        {
            await interaction.reply(`Partida não encontrada!`)
        }
	},
}