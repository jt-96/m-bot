require('dotenv').config()

const fs = require('node:fs');
const path = require('node:path');

//Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player');

//Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, 'GuildVoiceStates'] });

//Entrypoint for discord-player based application.
const player = new Player(client);

//Load all the extractors from discord-player package.
player.extractors.loadDefault((ext) => ext === 'YouTubeExtractor');

//Collecting commands
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    //Set a new item in the Collection with the key as the command name and the value as the exported module.

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// Find events folder and load each event, executing depending on type of event found when looping.
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.TOKEN);