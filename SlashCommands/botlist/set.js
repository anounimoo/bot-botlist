const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'set',
  description: 'Setar configurações de BOTLIST.',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'logs',
      description: 'Setar um canal de logs.',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'canal',
          description: 'Coloque o canal que deseja setar como canal de logs.',
          type: 'CHANNEL',
          required: true
        }
      ],
    },
    {
      name: 'addbot',
      description: 'Setar um canal de addbot.',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'channel',
          description: 'Coloque o canal que deseja setar como canal de addbot.',
          type: 'CHANNEL',
          required: true
        }
      ],
    }
  ],

  run: async (client, interaction, args) => {

    let sub = interaction.options.getSubcommand()

    if(sub === 'logs') {
      
      let canal = interaction.options.getChannel('canal')

      if(canal.type !== 'GUILD_TEXT') return interaction.reply(`**\\❌ - Coloque um canal de texto!**`)

      let perm = interaction.member.permissions.has('MANAGE_CHANNELS')
      
      if(!perm) return interaction.reply(`**\\❌ - Você não tem permissão de usar este comando!**`)
      
      interaction.reply(`**O canal ${canal} foi setado como canal de logs com sucesso!\n> \\⭐ - Todos os analises e envios de novos BOTS serão enviados neste canal.**`)

      db.set(`logs_${interaction.guild.id}`, canal.id)
      
    }

    if(sub === 'addbot') {
      
      let channel = interaction.options.getChannel('channel')

      if(channel.type !== 'GUILD_TEXT') return interaction.reply(`**\\❌ - Coloque um canal de texto!**`)

      let perm = interaction.member.permissions.has('MANAGE_CHANNELS')
      
      if(!perm) return interaction.reply(`**\\❌ - Você não tem permissão de usar este comando!**`)

      interaction.reply(`**O canal ${channel} foi setado como canal de addbot com sucesso!\n> \\⭐ - Apenas neste canal será possível usar o comando /addbot.**`)

      db.set(`canaladdbot_${interaction.guild.id}`, channel.id)
      
    }
  }
}
