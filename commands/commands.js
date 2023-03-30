const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

const exampleEmbed = new EmbedBuilder()
    // .setImage('https://cdn.discordapp.com/app-icons/1077947825595351190/b2be6b622c3e8701d8ff3524ac99961f.png')
	.setColor(0x7B61FF)
	.setTitle('Comandos')
	//.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Chess', iconURL: 'https://cdn.discordapp.com/app-icons/1077947825595351190/b2be6b622c3e8701d8ff3524ac99961f.png', url: 'https://discord.js.org' })
	.setDescription('Lista todos os comandos')
	// .setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
        { name: '\n', value: '\n' },
        { name: '\n', value: '\n' },
		{ name: '/multiplayer', value: 'Criar partida multiplayer' },
        { name: '\n', value: '\n' },
		{ name: '/singleplayer', value: 'Criar partida contra IA' },
        { name: '\n', value: '\n' },
		{ name: '/mover', value: 'Mover uma peça' },
        { name: '\n', value: '\n' },
		{ name: '/reiniciar', value: 'Reiniciar a partida' },
        { name: '\n', value: '\n' },
		{ name: '/recuperar', value: 'Recuperar partida em andamento' },
        { name: '\n', value: '\n' },
		{ name: '/finalizar', value: 'Termine a partida' },
        { name: '\n', value: '\n' },
		{ name: '\n', value: '\n' },
        // { name: '/comandos', value: 'Lista todos os comandos' },
		// { name: '\n', value: '\n' },
		// { name: '\n', value: '\n' },
	)
    // .setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Ultima Atualização', iconURL: 'https://cdn.discordapp.com/app-icons/1077947825595351190/b2be6b622c3e8701d8ff3524ac99961f.png' })

module.exports = {
	data: new SlashCommandBuilder()
		.setName('comandos')
		.setDescription('Lista todos os comandos'),
	async execute(interaction) {
		await interaction.reply({ embeds: [exampleEmbed] })
	},
}