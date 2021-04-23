const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " +client.user.tag);
    
    client.user.setActivity("Orari", {type: "WATCHING"});
    var generalId;
    client.guilds.cache.forEach((guild) => {
        console.log(guild.name)
        guild.channels.cache.forEach((channel) => {
            console.log(`- ${channel.name} ${channel.type} ${channel.id} `)
            //takes ID dynamically no matter which server
            if(`${channel.name}` == 'general'){
                generalId = `${channel.id}`
            }

        })
    })
    let generalChannel = client.channels.cache.get(generalId)

})

client.on('message', (receivedMessage) => {
    if(receivedMessage.author == client.user){
        return
    }

    if(receivedMessage.content.startsWith("!")){
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage){
    let fullCommand = receivedMessage.content.substr(1)
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)

    if(primaryCommand == "help"){
        helpCommand(arguments, receivedMessage)
    } else if(primaryCommand == "orari"){
        orariCommand(arguments, receivedMessage)
    } else if(primaryCommand == "madeby"){
        madeCommand(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("Provo !orari.")
    }
}

function helpCommand(arguments, receivedMessage){
    if(arguments.length == 0){
        receivedMessage.channel.send("Shtyp !orari per te pare orarin")
    } else{
        receivedMessage.channel.send("Nuk u gjend komand me " +arguments)
    }
}

function orariCommand(arguments, receivedMessage){
    if(arguments.length == 0){
        const attachment = new Discord.MessageAttachment('C:\\Users\\OnLine\\Desktop\\Discord Bot App\\orari.png')
        receivedMessage.channel.send(attachment)
    } else{
        receivedMessage.channel.send("Provo vetem !orari")
    }
}

function madeCommand(arguments, receivedMessage){
    receivedMessage.channel.send("MJ of csgo")
}

client.login(process.env.token);