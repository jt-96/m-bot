require('dotenv').config()

//Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');

//Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//When the client is ready, run this code (only once)
//We can use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
    console.log(`Ready, Logged in as ${c.user.tag}`)
})

client.login(process.env.TOKEN);