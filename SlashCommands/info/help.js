const Discord = require("discord.js");

module.exports = {
  name: 'help',
  description: 'Veja os meus comandos!',
  type: 'CHAT_INPUT',

  run: async (client, interaction, args) => {
  
    let embed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`**Olá ${interaction.user.toString()}, boas vindas ao meu painel de ajuda.\nAqui, você irá ver todos os meus comando, eles estão logo abaixo:**`)
    .addFields({
      name: 'Comandos de BOTList:',
      value: `\`/addbot - /analise - /queue - /set\``
    },
    {
      name: 'Comandos de informações:',
      value: `\`/help - /invite\``
    })
    interaction.reply({ embeds: [embed] })
    
  }
}
