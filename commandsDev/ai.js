const { SlashCommandBuilder } = require('discord.js')
const server = require('../data/data_base.js')
const Board = require('../game/board.js')
const Piece = require('../game/piece.js')
const wait = require('node:timers/promises').setTimeout
const FeedBack = require('../game/feedback.js')

let values = [{name: 'A', value: 0},{name: 'B', value: 1},{name: 'C', value: 2},{name: 'D', value: 3},
                {name: 'E', value: 4},{name: 'F', value: 5},{name: 'G', value: 6},{name: 'H', value: 7},
                {name: '1', value: 7},{name: '2', value: 6},{name: '3', value: 5},{name: '4', value: 4},
                {name: '5', value: 3},{name: '6', value: 2},{name: '7', value: 1},{name: '8', value: 0},]

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ai')
		.setDescription('Mover IA'),
	async execute(interaction) {
        let lobby = server.lobbyes.find(lobby => lobby.id == interaction.channelId+interaction.guildId)
        await interaction.reply("ai")
        lobby.myInteraction.deleteReply()
        do
        {
            await wait(1000)
            if(lobby)
            {
                lobby.game.aiMove(lobby.difficulty) 
                const fromAi = lobby.game.getHistory()[lobby.game.getHistory().length == 0 ? 0 : lobby.game.getHistory().length - 1].from
                const toAi = lobby.game.getHistory()[lobby.game.getHistory().length == 0 ? 0 : lobby.game.getHistory().length - 1].to
                console.log("from " + fromAi)
                console.log("to " + toAi)
                let fromX = values.find(obj => fromAi[0] == obj.name).value
                let fromY = values.find(obj => fromAi[1] == obj.name).value
                let toX = values.find(obj => toAi[0] == obj.name).value
                let toY = values.find(obj => toAi[1] == obj.name).value
                if(Piece.CheckMovement(lobby.board[fromX][fromY], toX, toY, lobby))
                {
                    let attachment = await Board.CreateBoard("fromAi", fromX, fromY, "fromAi", toX, toY, lobby)
                    lobby.attachment = attachment
                    await interaction.editReply({ files: [lobby.attachment] })
                    console.log(lobby.game.printToConsole())
                    console.log(lobby.game.exportJson())
                    console.log(lobby.game.exportJson().isFinished)
                    console.log(lobby.game.exportJson().checkMate)
                    console.log(lobby.game.exportJson().check)
                }
                else {
                    FeedBack.CreateFeedback(interaction, `Você não pode mover essa peça desse jeito`, true, 5)
                }
            }
        } while(!lobby.game.exportJson().isFinished)
	},
}