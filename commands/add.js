const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
    
    .addSubcommand(subcommand =>
		subcommand
			.setName('user')
			.setDescription('user add')
			.addUserOption(option => option.setName('usuario').setDescription('The user\'s avatar to show')))
    
	.addSubcommand(subcommand =>
		subcommand
			.setName('points')
			.setDescription('puntos add')
      .addNumberOption(option => option.setName('puntos').setDescription('Puntos a meter'))),
	async execute(interaction) {
  


   if (interaction.options.getSubcommand() === 'user') {
			const user = interaction.options.getUser('usuario');
     

     users.establecer(user.username, {puntos: 0})
     console.log(user)
			
		} else if (interaction.options.getSubcommand() === 'points') {
			await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
		}
    
	},
};