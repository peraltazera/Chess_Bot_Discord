const { SlashCommandBuilder } = require('discord.js')
const server = require('../data/data_base.js')
const Board = require('../game/board.js')
const FeedBack = require('../game/feedback.js')
const Piece = require('../game/piece.js')
const wait = require('node:timers/promises').setTimeout

let positions = ['A8' ,'A7' ,'A6' ,'A5' ,'A4' ,'A3' ,'A2' ,'A1',
                'B8' ,'B7' ,'B6' ,'B5' ,'B4' ,'B3' ,'B2' ,'B1',
                'C8' ,'C7' ,'C6' ,'C5' ,'C4' ,'C3' ,'C2' ,'C1',
                'D8' ,'D7' ,'D6' ,'D5' ,'D4' ,'D3' ,'D2' ,'D1',
                'E8' ,'E7' ,'E6' ,'E5' ,'E4' ,'E3' ,'E2' ,'E1',
                'F8' ,'F7' ,'F6' ,'F5' ,'F4' ,'F3' ,'F2' ,'F1',
                'G8' ,'G7' ,'G6' ,'G5' ,'G4' ,'G3' ,'G2' ,'G1',
                'H8' ,'H7' ,'H6' ,'H5' ,'H4' ,'H3' ,'H2' ,'H1',]

let values = [{name: 'A', value: 0},{name: 'B', value: 1},{name: 'C', value: 2},{name: 'D', value: 3},
                {name: 'E', value: 4},{name: 'F', value: 5},{name: 'G', value: 6},{name: 'H', value: 7},
                {name: '1', value: 7},{name: '2', value: 6},{name: '3', value: 5},{name: '4', value: 4},
                {name: '5', value: 3},{name: '6', value: 2},{name: '7', value: 1},{name: '8', value: 0},]

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mover')
		.setDescription('Mover uma peça')
        .addStringOption(option =>
            option.setName('de')
                .setDescription('Aonde está a peça')
                .setRequired(true)
                .setMaxLength(2))
        .addStringOption(option =>
            option.setName('para')
                .setDescription('Para onde a peça vai')
                .setRequired(true)
                .setMaxLength(2)),
	async execute(interaction) {
        let lobby = server.lobbyes.find(lobby => lobby.id == interaction.channelId+interaction.guildId)
        if(lobby)
        {
            if(interaction.user.id == lobby.player1.id || interaction.user.id == lobby.player2.id)
            {
                if(interaction.user.id == lobby.player1.id && lobby.player1.turn || interaction.user.id == lobby.player2.id && lobby.player2.turn)
                {
                    const from = interaction.options.getString('de').toUpperCase()
                    const to = interaction.options.getString('para').toUpperCase()
                    if(positions.find(pos => pos == from) && positions.find(pos => pos == to))
                    {
                        let fromX = values.find(obj => from[0] == obj.name).value
                        let fromY = values.find(obj => from[1] == obj.name).value
                        let toX = values.find(obj => to[0] == obj.name).value
                        let toY = values.find(obj => to[1] == obj.name).value
                        if(lobby.board[fromX][fromY].name)
                        {
                            if((lobby.board[fromX][fromY].white && lobby.player1.turn && lobby.player1.pieces == 1 ) || 
                            (!lobby.board[fromX][fromY].white && lobby.player2.turn && lobby.player2.pieces == 2) ||
                            (!lobby.board[fromX][fromY].white && lobby.player1.turn && lobby.player1.pieces == 2 ) || 
                            (lobby.board[fromX][fromY].white && lobby.player2.turn && lobby.player2.pieces == 1))
                            {
                                if(!lobby.board[toX][toY].name || lobby.board[toX][toY].name && lobby.board[toX][toY].white && lobby.player2.turn && lobby.player2.pieces == 2 ||
                                    lobby.board[toX][toY].name && !lobby.board[toX][toY].white && lobby.player1.turn && lobby.player1.pieces == 1 ||
                                    lobby.board[toX][toY].name && !lobby.board[toX][toY].white && lobby.player2.turn && lobby.player2.pieces == 1 ||
                                    lobby.board[toX][toY].name && lobby.board[toX][toY].white && lobby.player1.turn && lobby.player1.pieces == 2 )
                                {
                                    if(Piece.CheckMovement(lobby.board[fromX][fromY], toX, toY, lobby) && lobby.game.moves(from).find(gameTo => to == gameTo))
                                    {
                                        let attachment = await Board.CreateBoard(from, fromX, fromY, to, toX, toY, lobby)
                                        lobby.attachment = attachment
                                        await interaction.reply({ files: [lobby.attachment] })
                                        const message = await interaction.fetchReply()
                                        lobby.messageId = message.id
                                        console.log(lobby.game.moves(from))
                                        console.log(lobby.game.moves(from).find(gameTo => to == gameTo))
                                        lobby.game.move(from, to)
                                        if(lobby.myInteraction){
                                            lobby.myInteraction.deleteReply()
                                        }
                                        if(lobby.ai){
                                            await interaction.followUp({ content: 'Aguarde a bot fazer sua jogada!', ephemeral: true });
                                            lobby.game.aiMove(lobby.difficulty) 
                                            const fromAi = lobby.game.getHistory()[lobby.game.getHistory().length == 0 ? 0 : lobby.game.getHistory().length - 1].from
                                            const toAi = lobby.game.getHistory()[lobby.game.getHistory().length == 0 ? 0 : lobby.game.getHistory().length - 1].to
                                            fromX = values.find(obj => fromAi[0] == obj.name).value
                                            fromY = values.find(obj => fromAi[1] == obj.name).value
                                            toX = values.find(obj => toAi[0] == obj.name).value
                                            toY = values.find(obj => toAi[1] == obj.name).value
                                            if(Piece.CheckMovement(lobby.board[fromX][fromY], toX, toY, lobby))
                                            {
                                                await wait(1000)
                                                attachment = await Board.CreateBoard(from, fromX, fromY, to, toX, toY, lobby)
                                                lobby.attachment = attachment
                                                await interaction.editReply({ files: [lobby.attachment] })
                                                await interaction.followUp({ content: 'Sua vez de jogar!', ephemeral: true });
                                            }
                                        }
                                        if(lobby.game.exportJson().isFinished) 
                                        {
                                            server.lobbyes.splice(server.lobbyes.indexOf(lobby), 1)
                                            await interaction.followUp('Jogo Finalizado!');
                                            if(lobby.game.exportJson().checkMate) 
                                            {
                                                if(lobby.game.exportJson().turn == "black")
                                                {
                                                    await interaction.followUp('As brancas ganharam!');
                                                }
                                                else
                                                {
                                                    await interaction.followUp('As pretas ganharam!');
                                                }
                                            } 
                                            else 
                                            {
                                                await interaction.followUp('Empate!');
                                            }
                                        }
                                        else if(lobby.game.exportJson().check)
                                        {
                                            if(lobby.game.exportJson().turn == "black")
                                            {
                                                await interaction.followUp('As pretas estão em check!');
                                            }
                                            else
                                            {
                                                await interaction.followUp('As brancas estão em check!');
                                            }
                                        }
                                        lobby.myInteraction = interaction
                                        console.log(lobby.game.printToConsole())
                                        // console.log(lobby.game.exportJson())
                                        console.log(lobby.game.exportJson().turn)
                                        console.log(lobby.game.exportJson().isFinished)
                                        console.log(lobby.game.exportJson().checkMate)
                                        console.log(lobby.game.exportJson().check)
                                    }
                                    else
                                    {
                                        FeedBack.CreateFeedback(interaction, `Você não pode fazer este movimento`, true, 5) // Você não pode mover essa peça desse jeito
                                    }
                                }
                                else
                                {
                                    FeedBack.CreateFeedback(interaction, `Você não pode mover suas peças para uma casa que ja possua uma peça sua`, true, 5)
                                }
                            }
                            else
                            {
                                FeedBack.CreateFeedback(interaction, `Você não pode mover as peças do oponente`, true, 5)
                            }
                        }
                        else
                        {
                            FeedBack.CreateFeedback(interaction, `A pocição informada não contem nenhuma peça`, true, 5)
                        }
                    }
                    else
                    {
                        FeedBack.CreateFeedback(interaction, `Movimento Invalido`, true, 5)
                    }
                }
                else
                {
                    FeedBack.CreateFeedback(interaction, `Não é seu turno`, true, 5)
                }
            }
            else
            {
                FeedBack.CreateFeedback(interaction, `Você não esta participando do jogo`, true, 5)
            }
        }
        else
        {
            FeedBack.CreateFeedback(interaction, `Jogo não existe`, true, 5)
        }
	},
}