const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

const exampleEmbed = new EmbedBuilder()
    .setImage('https://i.imgur.com/AfFp7pu.png')
	.setColor(0x0099FF)
	.setTitle('Commands')
	//.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Bot Chess', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Lista de todos os comandos!')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
        { name: '\n', value: '\n' },
        { name: '\n', value: '\n' },
		{ name: '/chess', value: 'Criar partida multiplayer' },
        { name: '\n', value: '\n' },
		{ name: '/restart', value: 'Reiniciar a partida' },
        { name: '\n', value: '\n' },
		{ name: '/delete', value: 'Finaliza a partida' },
        { name: '\n', value: '\n' },
        { name: '/ai', value: 'Criar partida contra IA' },
        { name: '\n', value: '\n' },
        { name: '/move', value: 'Mover uma peça' },
        { name: '\n', value: '\n' },
        { name: '/recover', value: 'Recuperar partida em andamento' },
        { name: '\n', value: '\n' },
        { name: '/commands', value: 'Lista todos os comandos' },
	)
    .setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Ultima Atualização', iconURL: 'https://i.imgur.com/AfFp7pu.png' })

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription('Lista todos os comandos!'),
	async execute(interaction) {
		await interaction.reply({ embeds: [exampleEmbed] })
	},
}