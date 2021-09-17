const dotenv = require('dotenv');
const path = require('path');
const { SlashCreator, GatewayServer } = require('slash-create');
const { Client } = require('discord.js');
const { Player } = require('discord-player');
const { registerPlayerEvents } = require('./events');
const { generateDocs } = require('./docs');

dotenv.config();

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_VOICE_STATES'
    ]
});

client.player = new Player(client);
registerPlayerEvents(client.player);

const creator = new SlashCreator({
  applicationID: process.env.DJS_CLIENT_ID,
  token: process.env.DJS_TOKEN,
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    console.log('Generating docs...');
    generateDocs(creator.commands);
});

creator
    .withServer(
        new GatewayServer(
            (handler) => client.ws.on('INTERACTION_CREATE', handler)
        )
    )
    .registerCommandsIn(path.join(__dirname, 'commands'));

if (process.env.DISCORD_GUILD_ID) creator.syncCommandsIn(process.env.DISCORD_GUILD_ID);
else creator.syncCommands();

client.login(process.env.DJS_TOKEN);

module.exports.client = client;
module.exports.creator = creator;

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);
