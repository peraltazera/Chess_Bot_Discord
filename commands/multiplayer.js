const { SlashCommandBuilder } = require('discord.js')
const server = require('../data/data_base.js')
const jsChessEngine = require('js-chess-engine')
const Board = require('../game/board.js')
const FeedBack = require('../game/feedback.js')
const { databaseBot } = require('../services/firebaseConfig.js')
const Teste = require('../index.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('multiplayer')
		.setDescription('Criar partida multiplayer')
        .addUserOption(option =>
            option.setName('brancas')
                .setDescription('Jogador das brancas')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('pretas')
                .setDescription('Jogador das pretas')
                .setRequired(true)),
	async execute(interaction) {
        let lobby = server.lobbyes.find(lobby => lobby.id == interaction.channelId+interaction.guildId)
        const white = interaction.options.getUser('brancas')
        const black = interaction.options.getUser('pretas')
        if(lobby)
        {
            FeedBack.CreateFeedback(interaction, `Jogo ja foi criado!`, true, 5)
        }
        else if(!white.bot && !black.bot)
        {
            const game = new jsChessEngine.Game()
            server.lobbyes.push(new server.lobby(interaction.channelId+interaction.guildId,
                interaction.channelId, interaction.guildId, 
                { id: white.id, username: white.username, turn: true, pieces: 1 }, 
                { id: black.id, username: black.username, turn: false, pieces: 2}, 
                interaction, 
                '',
                game,
                '',
                false))
            lobby = server.lobbyes.find(lobby => lobby.id == interaction.channelId+interaction.guildId)
            const attachment = await Board.CreateBoard(null, null, null, null, null, null, lobby)
            lobby.attachment = attachment
            await interaction.reply({ files: [lobby.attachment] })
            const message = await interaction.fetchReply()
            lobby.messageId = message.id
        }
        else
        {
            FeedBack.CreateFeedback(interaction, `Você não pode jogar contra um bot!`, true, 5)
        }
	},
}