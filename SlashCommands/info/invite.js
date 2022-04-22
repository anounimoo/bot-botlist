const Discord = require('discord.js');

module.exports = {
  name: 'invite',
  description: 'Me convide para o seu servidor!',
  type: 'CHAT_INPUT',

  run: async (client, interaction, args) => {
    let embed = new Discord.MessageEmbed()
    .setDescription(`**Olá ${interaction.user.toString()}, clique [aqui](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot%20applications.commands) para me adicionar em seu servidor!**`)
    .setColor('#FF0000')
    interaction.reply({ embeds: [embed] })
  }
}
