const { SlashCommandBuilder } = require('discord.js')
const server = require('../data/data_base.js')
const jsChessEngine = require('js-chess-engine')
const Board = require('../game/board.js')
const FeedBack = require('../game/feedback.js')
const { databaseBot } = require('../services/firebaseConfig.js')
const Teste = require('../index.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chess')
		.setDescription('Criar partida multiplayer!')
        .addUserOption(option =>
            option.setName('white')
                .setDescription('Jogador das brancas!')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('black')
                .setDescription('Jogador das pretas!')
                .setRequired(true)),
	async execute(interaction) {
        let lobby = server.lobbyes.find(lobby => lobby.id == interaction.channelId+interaction.guildId)
        const white = interaction.options.getUser('white')
        const black = interaction.options.getUser('black')
        if(lobby)
        {
            FeedBack.CreateFeedback(interaction, `Jogo ja foi criado!`, true, 5)
        }
        else if(!white.bot && !black.bot)
        {
            server.lobbyes.push(new server.lobby(interaction.channelId+interaction.guildId,
                interaction.channelId, interaction.guildId, 
                { id: white.id, username: white.username, turn: true }, 
                { id: black.id, username: black.username, turn: false}, 
                interaction, 
                '',
                '',
                ''))
            lobby = server.lobbyes.find(lobby => lobby.id == interaction.channelId+interaction.guildId)
            const attachment = await Board.CreateBoard(null, null, null, null, null, null, lobby)
            lobby.attachment = attachment
            await interaction.reply({ files: [lobby.attachment] })
        }
        else
        {
            FeedBack.CreateFeedback(interaction, `Você não pode jogar contra um bot!`, true, 5)
        }
	},
}