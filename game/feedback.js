const wait = require('node:timers/promises').setTimeout

async function CreateFeedback(interaction, text, hide, seconds){
    await interaction.reply({ content: text, ephemeral: hide })
    if(seconds > 0){
        await wait(seconds*1000)
        await interaction.deleteReply()
    }
}

exports.CreateFeedback = CreateFeedback