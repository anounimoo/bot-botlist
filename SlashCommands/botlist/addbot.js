const Discord = require("discord.js");
const db = require('quick.db')

module.exports = {
  name: 'addbot',
  description: 'Adicione o seu bot no servidor!',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'id',
      description: 'Coloque o ID do seu bot.',
      type: 'STRING',
      required: true
    },
    {
      name: 'prefixo',
      description: 'Coloque o prefixo do seu bot. (Caso seja em slash [/], coloque apenas um /.)',
      type: 'STRING',
      required: true
    },
    {
      name: 'descrição',
      description: 'Coloque a descrição do seu bot.',
      type: 'STRING',
      required: true
    }
  ],

  run: async (client, interaction, args) => {
  
    let id_bot = interaction.options.getString('id')
    let prefix = interaction.options.getString('prefixo')
    let desc = interaction.options.getString('descrição')

    let logs = db.get(`logs_${interaction.guild.id}`)
    let canal_addbot = db.get(`canaladdbot_${interaction.guild.id}`)
    let bot = db.get(`bot_${interaction.user.id}`)

    if(interaction.user.id === '905896087783604305') db.delete(`bot_${interaction.user.id}`)

    if(bot === 1) return interaction.reply(`**\\❌ - Você já tem um BOT neste servidor!**`)

    if(!logs) return interaction.reply(`**\\❌ - Não tem nenhum canal de logs setado!\n> \\⭐ - Peça a um administrador setar um canal.**`)
    if(!canal_addbot) return interaction.reply(`**\\❌ - Não tem nenhum canal de addbot setado!\n> \\⭐ - Peça a um administrador setar um canal.**`)

    if(interaction.channel.id !== canal_addbot) { interaction.reply(`**\\❌ - Use o canal correto para adicionar seu BOT.\n> \\⭐ - Tente usar o canal: <#${canal_addbot}>!**`)
    } else {

    if(isNaN(id_bot)) return interaction.reply(`**\\❌ - Coloque um ID válido!**`)
    if(id_bot.length !== 18) return interaction.reply(`**\\❌ - Coloque um ID válido!**`)
    if(desc.length > 200) return interaction.reply(`**\\❌ - Coloque uma descrição menor!\n> \\⭐ - Máximo de \`200\` caractéres.**`)
    
    let embed = new Discord.MessageEmbed()
    .setTitle(`Novo bot enviado!`)
    .addFields({
      name: 'BOT enviado por:',
      value: `\`\`\`${interaction.user.tag}\`\`\``
    },
    {
      name: 'ID do BOT:',
      value: `\`\`\`${id_bot}\`\`\``
    },
    {
      name: 'Prefixo:',
      value: `\`\`\`${prefix}\`\`\``
    },
    {
      name: 'Descrição:',
      value: `\`\`\`${desc}\`\`\``
    },
    {
      name: 'Adicione o BOT!',
      value: `[Clique aqui](https://discord.com/api/oauth2/authorize?client_id=${id_bot}&permissions=0&scope=bot%20applications.commands)`
    })
    .setColor('#FF0000')
    client.channels.cache.get(logs).send({ embeds: [embed] })

    interaction.reply(`**O BOT foi enviado com sucesso!**`)

    let link = `[adicionar](https://discord.com/api/oauth2/authorize?client_id=${id_bot}&permissions=0&scope=bot%20applications.commands)`

    db.set(`queue_${interaction.guild.id}_${id_bot}`, `<@${id_bot}>`)
    db.set(`qdono_${interaction.guild.id}_${id_bot}`, `${interaction.user.toString()}`)
    db.set(`bot_${interaction.user.id}`, 1)
    db.set(`qlink_${interaction.guild.id}_${id_bot}`, link)
      
    }
  }
}
