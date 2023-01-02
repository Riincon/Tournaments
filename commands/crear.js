const { EmbedBuilder ,SlashCommandBuilder } = require('discord.js');
const fs = require("fs")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('crear')
		.setDescription('crear pagina')
		.addStringOption(option =>
		option.setName('descripcion')
      .setDescription('La descripcion del server')
      .setRequired(true)),
     
	async execute(interaction) {
		const text = interaction.options.getString('descripcion');
   const channel = interaction.channel;
 const invite = channel.createInvite()
    
    function createHTML() {
    const code = `
    <!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>CW</title>
  <link href="css/template.css" rel="stylesheet" type="text/css" />
  <style> @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@600&display=swap'); </style>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
</head>

<body>
  <nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
    <img src="https://cdn.discordapp.com/attachments/869765742327910410/1056658654696312862/CWPng.png">
</nav>
  
<div class="container">
  <img src="${interaction.guild.iconURL({
               dynamic: true,
                size: 1024
            })}">
  <h1>${interaction.guild.name}</h1>
  <p>${text}</p>
  
  <button onclick="window.location.href = '${invite}'">Join Server</button>
</div>

  
  <script src="script.js"></script>
</body>

</html>
    `

var stream = fs.createWriteStream(`./pages/${interaction.guild.name}.html`, { flags: 'a' })
    stream.write(code)
}

createHTML('Prueba') 
 

 const emb = new EmbedBuilder()
.setDescription(`Pagina creada correctamente! 
Tu pagina: https://Tournaments.ohrincon.repl.co/${interaction.guild.name}.html`)
interaction.reply({embeds:[emb]})
	},
};