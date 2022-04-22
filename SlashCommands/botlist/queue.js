const Discord = require('discord.js')
const db = require('quick.db')
module.exports = {
  name: 'queue',
  description: 'Veja a fila de BOTS.',
  type: 'CHAT_INPUT',

  run: async (client, interaction, args) => {

    let money = db.all().filter(lb => lb.ID.startsWith(`queue_`)).sort((a, b) => b.data- a.data)
        let bankBalance = money.slice(0, 5)
        let content = " ";

    let dono = db.all().filter(lb => lb.ID.startsWith(`qdono_`)).sort((a, b) => b.data- a.data)
    let bunkBalance = dono.slice(0, 5)

    let link = db.all().filter(lb => lb.ID.startsWith(`qlink_`)).sort((a, b) => b.data- a.data)
    let binkBalance = link.slice(0, 5)

        for(let i = 0; i < bankBalance.length && bunkBalance.length && binkBalance; i++) {
            let user = client.users.cache.get(bankBalance[i].ID.split('_')[1])

            content += `${i+1}. ${bankBalance[i].data} - ${binkBalance[i].data} | Dono: ${bunkBalance[i].data}\n`

        }

    if(content === `` || content === ` `) {
      const embed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setTitle(`Queue`)
        .setDescription(`** Sem BOTS na fila! **`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))

interaction.reply({ embeds: [embed]})
    } else {

        const embed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setTitle(`Queue`)
        .setDescription(`** ${content} **`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))

interaction.reply({ embeds: [embed]})
    }
}
}
