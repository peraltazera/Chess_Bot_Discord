const { SlashCommandBuilder } = require('discord.js')
const server = require('../data/data_base.js')
const jsChessEngine = require('js-chess-engine')
const Board = require('../game/board.js')
const FeedBack = require('../game/feedback.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('singleplayer')
		.setDescription('Criar partida contra IA')
        .addUserOption(option =>
            option.setName('jogador')
                .setDescription('Jogador')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('dificuldade')
                .setDescription('Dificuldade')
                .setRequired(true)
                .addChoices(
					{ name: 'Muito Facil', value: '0' },
					{ name: 'Facil', value: '1' },
					{ name: 'Medio', value: '2' },
                    { name: 'Dificil', value: '3' },
                    { name: 'Muito Dificil', value: '4' }
				)),
	async execute(interaction) {
        let lobby = server.lobbyes.find(lobby => lobby.id == interaction.channelId+interaction.guildId)
        const user = interaction.options.getUser('user')
        const difficulty = parseInt(interaction.options.getString('dificuldade'))
        if(lobby)
        {
            FeedBack.CreateFeedback(interaction, `Jogo ja foi criado!`, true, 5)
        }
        else if(!user.bot)
        {
            const game = new jsChessEngine.Game()
            server.lobbyes.push(new server.lobby(interaction.channelId+interaction.guildId,
                interaction.channelId, interaction.guildId, 
                { id: user.id, username: user.username, turn: true }, 
                { id: difficulty, username: 'Bot', turn: false}, 
                interaction, 
                difficulty,
                game,
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