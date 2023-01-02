const express = require('express');
const app = express();
const fs = require('node:fs');
const path = require('node:path');
const token = process.env['TOKEN']
const { Routes, REST, Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const Discord = require("discord.js")


app.use(express.static(path.join(__dirname, 'pages')))

app.get('/', (request, response) => {
	return response.sendFile('./pages/index.html', { root: '.' });
});

app.listen(3000, () => {
  console.log('Mi API está corriendo en el puerto 3000');
});

///////HANDLER COMMANDS
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}
///////HANDLER EVENTS/////
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

///////REGISTER COMMANDS////////
const commands = [];
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(
      Routes.applicationCommands("1053975070181175316"),
      { body: commands });

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {

    console.error(error);
  }
})();

client.login(token);