// Require the necessary discord.js classes
const fs = require('node:fs')
const path = require('node:path')
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js')
const { token } = require('./config.json')
const server = require('./data/data_base.js')

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })

client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command)
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
	}
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`)
})

client.login(token)

client.on(Events.MessageCreate, async message => {
	console.log(message.content)
	if (message.content === '!hello') {
		message.reply('Olá!')
		message.reply({ content: `Tudo bem?`, ephemeral: true })
	}
})

client.on(Events.MessageDelete, (interaction) => {
	console.log(`A interação ${interaction.id} foi deletada.`);
	const lobby = server.lobbyes.find(lobby => lobby.id == interaction.channelId+interaction.guildId)
	if(lobby){
		lobby.myInteraction = '';
		console.log(`A interação da partida foi deletada`);
	}
});
  
client.on(Events.InteractionCreate, async interaction => {      
    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`)
		return
	}

	try {
		await command.execute(interaction)
	} catch (error) {
		console.error(error)
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
	}
})
  
function SendMSG(id, msg){
    client.users.send(id, msg)
}

exports.SendMSG = SendMSG
  



