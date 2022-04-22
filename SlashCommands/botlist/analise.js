const Discord = require("discord.js");
const db = require('quick.db');

module.exports = {
name: "analise",
description: "Faça a análise de um BOT.",
type: 'CHAT_INPUT',
options: [
{
name: `id`,
description: `Coloque o ID do bot que será analisado!`,
type: `STRING`,
required: true,
},
{
name: `nota`,
description: `Dê uma nota a esse BOT.`,
type: `STRING`,
required: true,
},
{
name: 'resultado',
description: 'O BOT foi aprovado ou reprovado?',
type: 'STRING',
required: true,
choices: [
{
name: `Aprovado`,
value: `ap`
},
{
name: `Reprovado`,
value: `re`
}]
}],

run: async (client, interaction, args) => {

if(!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply(`**\\❌ - Você não tem permissão de usar este comando!**`)

let id = interaction.options.getString('id')
let nota = interaction.options.getString('nota')
let res = interaction.options.getString('resultado')

if(isNaN(id)) return interaction.reply(`**\\❌ - Coloque um ID válido!**`)
if(id.length !== 18) return interaction.reply(`**\\❌ - Coloque um ID válido!**`)

let bot = db.get(`queue_${interaction.guild.id}_${id}`)

if(!bot || bot === null) return interaction.reply(`**\\❌ - Este BOT não está salvo no meu banco de dados!\n> \\⭐ - Use \`/queue\` e veja os BOTS que estão esperando a análise.**`)

if(res === 'ap') {

  interaction.reply(`**Análise realizada com sucesso!**`)

  let logs = db.get(`logs_${interaction.guild.id}`)
  let dono = db.get(`qdono_${interaction.guild.id}_${id}`)

  let embed = new Discord.MessageEmbed()
  .setTitle(`BOT aprovado!`)
  .setColor('GREEN')
  .addFields({
    name: 'Dono do BOT:',
    value: `${dono}`
  },
  {
    name: 'BOT que foi aprovado:',
    value: `<@${id}>`
  },
  {
    name: 'BOT analisado por:',
    value: `${interaction.user.toString()}`
  },
  {
    name: 'Nota:',
    value: `\`\`\`${nota}\`\`\``
  })
  .setThumbnail(client.users.cache.get(id).displayAvatarURL())
  client.channels.cache.get(logs).send({ content: `\\✅ - ${dono}`, embeds: [embed] })

  db.delete(`queue_${interaction.guild.id}_${id}`)
  db.delete(`qdono_${interaction.guild.id}_${id}`)
  db.delete(`qlink_${interaction.guild.id}_${id}`)
}

  if(res === 're') {
  
  interaction.reply(`**Análise realizada com sucesso!**`)

  let logs = db.get(`logs_${interaction.guild.id}`)
  let dono = db.get(`qdono_${interaction.guild.id}_${id}`)

  let embed = new Discord.MessageEmbed()
  .setTitle(`BOT repovado!`)
  .setColor('#FF0000')
  .addFields({
    name: 'Dono do BOT:',
    value: `${dono}`
  },
  {
    name: 'BOT que foi reprovado:',
    value: `<@${id}>`
  },
  {
    name: 'BOT analisado por:',
    value: `${interaction.user.toString()}`
  },
  {
    name: 'Nota:',
    value: `\`\`\`${nota}\`\`\``
  })
  .setThumbnail(client.users.cache.get(id).displayAvatarURL())
  client.channels.cache.get(logs).send({ content: `\\❌ - ${dono}`, embeds: [embed] })

  db.delete(`queue_${interaction.guild.id}_${id}`)
  db.delete(`qdono_${interaction.guild.id}_${id}`)
  db.delete(`qlink_${interaction.guild.id}_${id}`)
  interaction.guild.members.cache.get(id).kick()
  }
},
};
