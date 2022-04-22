const Discord = require("discord.js");

module.exports = {
  name: 'botinfo',
  description: 'Veja as minhas informações!',
  type: 'CHAT_INPUT',

  run: async (client, interaction, args) => {

    let criado = client.user.createdTimestamp
  
    let embed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`**Olá ${interaction.user.toString()}, este é o lugar onde você irá ver algumas das minhas informações, elas estão logo abaixo:\n\n> Fui criado em: <t:${parseInt(criado / 1000)}>\n> Estou em \`${client.guilds.cache.size}\` servidores e gerenciando \`${client.users.cache.size}\` usuários!\n> A minha memória é de \`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB\`.\n> Meu ping é de \`${client.ws.ping}ms\`.**`)
    .setThumbnail(client.user.displayAvatarURL())
    interaction.reply({ embeds: [embed] })
    
  }
}
