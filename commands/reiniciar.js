const { SlashCommandBuilder } = require('discord.js')
const server = require('../data/data_base.js')
const jsChessEngine = require('js-chess-engine')
const Board = require('../game/board.js')
const Piece = require('../game/piece.js')
const wait = require('node:timers/promises').setTimeout
const FeedBack = require('../game/feedback.js')

const values = [{name: 'A', value: 0},{name: 'B', value: 1},{name: 'C', value: 2},{name: 'D', value: 3},
                {name: 'E', value: 4},{name: 'F', value: 5},{name: 'G', value: 6},{name: 'H', value: 7},
                {name: '1', value: 7},{name: '2', value: 6},{name: '3', value: 5},{name: '4', value: 4},
                {name: '5', value: 3},{name: '6', value: 2},{name: '7', value: 1},{name: '8', value: 0},]

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
                { id: lobby.player1.id, username: lobby.player1.username, turn: lobby.player1.pieces == 1 ? true : false, pieces: lobby.player1.pieces  }, 
                { id: lobby.player2.id, username: lobby.player2.username, turn: lobby.player2.pieces == 1 ? true : false, pieces: lobby.player2.pieces  }, 
                lobby.myInteraction, 
                lobby.difficulty,
                game,
                '',
                lobby.ai,
                lobby.messageId))
            server.lobbyes.splice(server.lobbyes.indexOf(lobby), 1)
            lobby = server.lobbyes.find(lobby => lobby.id == interaction.channelId+interaction.guildId)
            let attachment = await Board.CreateBoard(null, null, null, null, null, null, lobby)
            await interaction.reply({ files: [attachment] })
            lobby.myInteraction = interaction
            const message = await interaction.fetchReply()
            lobby.messageId = message.id
            if(lobby.player1.pieces == 2)
            {
                await interaction.followUp({ content: 'Aguarde a bot fazer sua jogada!', ephemeral: true });
                lobby.game.aiMove(lobby.difficulty) 
                const fromAi = lobby.game.getHistory()[lobby.game.getHistory().length == 0 ? 0 : lobby.game.getHistory().length - 1].from
                const toAi = lobby.game.getHistory()[lobby.game.getHistory().length == 0 ? 0 : lobby.game.getHistory().length - 1].to
                const fromX = values.find(obj => fromAi[0] == obj.name).value
                const fromY = values.find(obj => fromAi[1] == obj.name).value
                const toX = values.find(obj => toAi[0] == obj.name).value
                const toY = values.find(obj => toAi[1] == obj.name).value
                if(Piece.CheckMovement(lobby.board[fromX][fromY], toX, toY, lobby))
                {
                    await wait(1000)
                    attachment = await Board.CreateBoard(fromAi, fromX, fromY, toAi, toX, toY, lobby)
                    lobby.attachment = attachment
                    await interaction.editReply({ files: [lobby.attachment] })
                    await interaction.followUp({ content: 'Sua vez de jogar!', ephemeral: true });
                }
            }
        }
        else
        {
            FeedBack.CreateFeedback(interaction, `Partida não encontrada!`, true, 5)
        }
	},
}