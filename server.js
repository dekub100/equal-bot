const http = require('http');
const express = require('express');
const app = express();
app.use(express.static('public'));
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200)
});
app.use(express.static('public'));
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200)
});
app.listen('token');

const fs = require("fs");
const config = require("./config.json");
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.command = new Discord.Collection();
let prefix = config.prefix;
const client = new Discord.Client();


bot.on("message", async (message) => {
if(message.author.bot)return
if(message.channel.type === "dm") return
if(!message.content.startsWith(prefix))return

const args = message.content.slice(prefix.length).trim().split(/ +/g)
const command = args.shift().toLowerCase()

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});



bot.on('ready', () =>{
  bot.user.setActivity('with /help' , {type: "PLAYING"})
  console.log("logged into: " + bot.user.tag)
})
 
if(command === "ping") {
    message.channel.send("BOOM! :boom: Here's your ping: " + Math.round(bot.ping) + "ms!")
  }

if(command === "eval") {
if(message.author.id == "430380605683924993") {
      try {
        const code = args.join(" ");
        let evaled = eval(code);
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
        message.channel.send(evaled)
      }catch (err) {
        console.log(err)
      }}}


if (command === "invite") {
 let embed = new Discord.RichEmbed()
	.setColor('#0099ff')
	.setTitle('Support Menu')
  .addField('Be sure to join the support server! :heart:', '[Click](https://discord.gg/BYY28dk)')
	.addField('Check me out on top.gg! :hugging:', '[Click](https://top.gg/bot/629954111814631437)')
    message.channel.send(embed);
};


  if (command === "say") {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
var sayembed = new Discord.RichEmbed()
  .setTitle('Insufficient Permissions!')
  .setDescription('You need the `MANAGE MESSAGES` permission to use this command!')
      return message.channel.send(sayembed); //done, they need the 'BAN_MEMBERS' permission to use the command.
    let saymessage = args.join(" "); //
    if (!saymessage) return message.channel.send("Please Give Text"); //return a message if they don't provide text.
    message.channel.send(saymessage); //send the message.
   message.delete();
  }


  
if (command==="help") {
 let helpembed = new Discord.RichEmbed()
      .setTitle("Help Menu")
      .setColor("#1d1c1c")
      .addField("/help-misc", "This is the `Miscellaneous Menu`. Usage: `/help-misc`")
      .addField("/help-mod", "This is the `Moderation Menu`. Usage: `/help-mod`")
      .addField("/help-info", "This is the `Information Menu`. Usage: `/help-info`")
    message.channel.send(helpembed);
}

if (command =='help-mod'){
let ModerationEmbed = new Discord.RichEmbed()
      .setColor("#ff0000")
      .setTitle("Help Moderation")
      .addField("Ban", "This command is used to ban the user that is acting badly or against the rules. To use this command you need the `BAN MEMBERS` permission.")
      .addField("Kick", "This command is used kick the user that is acting badly or against the rules. To use this command you need the `KICK MEMBERS` permission.")
      .addField("Purge", "With this command you can delete any messages ranging from 1 to 100. To use this command you need the `MANAGE MESSAGES` permissions.")
      .addField("Warn", "This commands allows you to warn a player that acts against the rules. To use this command you need the `VIEW AUDIT LOG` permission.")
    message.channel.send(ModerationEmbed);
}
  
  if (command ==='help-misc'){
      let MiscEmbed = new Discord.RichEmbed()
      .setColor("#ff0000")
      .setTitle("Help Miscellaneous")
      .addField("Uptime", "With this command you can check how long the bot has been up, and check in how users and how many servers the bot is in!")
      .addField("Invite", "This command allows you to join the support server or either invite the bot to your server.")
      .addField("Avatar", "You can check your avatar.")
message.channel.send(MiscEmbed);
  }
  
  if (command ==='help-info'){
    let InfoEmbed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setTitle("Help Information")
    .addField("Botinfo", "This command is for checking the owner creation date etc. of the bot.")
    .addField("Serverinfo", "Here you can check the servers name and user count and even the region! This command requires the `VIEW AUDIT LOG` permission.")
    message.channel.send(InfoEmbed);
  }
      
  if (command === "botinfo") {
    let embed = new Discord.RichEmbed()
      .setTitle("Bot Info")
      .setColor("#1d1c1c")
      .addField("Bot Created by", "?????")
      .addField("Bot Creation Date", "05.10.2019")
    message.channel.send(embed);
  }
  
  if (command=="uptime") {
let totalSeconds = (bot.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);

    
    let UptimeEmbed = new Discord.RichEmbed()
    .addField("Users", `${bot.users.size}`)
    .addField("Servers", `${bot.guilds.size}`)
    .addField("Uptime", `${days} days, ${hours} hours and ${minutes} minutes `)
    message.channel.send(UptimeEmbed);
    
  }

  if (command === "reset") {
    if (message.author.id == "430380605683924993") {
    } else {
      return message.channel.send("You're not __**OWNER**__");
    }
    {
      resetBot(message.channel);
      function resetBot(channel) {
        message.channel.send("Bot is restarting");
        bot.user.setActivity(`Restarting......`);
        message
          .reply("Bot has been restarted successfully!")
          .then(msg => bot.destroy())
          .then(() => bot.login(process.env.TOKEN));
      }
    }
  }

  if(command === 'purge'){
let has_mngmsg = message.member.permissions.has("MANAGE_MESSAGES")
if(has_mngmsg){
const deleteCount = parseInt(args[0], 10)
if(!deleteCount || deleteCount < 2 || deleteCount > 100)
return message.reply("Please provide a number between 2 and 100 for messages to purge")
const fetched = await message.channel.fetchMessages({limit : deleteCount})
message.channel.bulkDelete(fetched)
}else{
  var purgeembed = new Discord.RichEmbed()
  .setTitle('Insufficient Permissions!')
  .setDescription('You need the `MANAGE MESSAGES` permission to use this command!')
message.reply(purgeembed)
}}
 

  if (command === "kick") {
    let has_kick = message.member.permissions.has("KICK_MEMBERS");
    if (has_kick) {
      const user = message.mentions.users.first() || bot.users.get(args[0]);
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          if (member.kickable)
            await member
              .kick({
                reason: `${args.slice(1).join(" ")}`
              })
              .then(() => {
                message.channel.send(
                  `${message.author.username} kicked ${member.user.username} for ${member.kick.reason}`
                );
              })
              .catch(err => message.channel.send(`Error: ${err}`));
        } else {
          message.channel.send("That user isn't in this server");
        }
      } else {
        message.channel.send("You didn't specify a user to kick");
      }
    } else {
      message.channel.send("You can't use this command");
    }
  }

  
  if (command === "ban") {


    if (!message.member.hasPermission("BAN_MEMBERS")) {
     return message.reply(`You dont have permissions.`).then(m => m.delete(5000));
     }
      

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return message.reply(`You dont have permissions.`).then(m => m.delete(5000));
    }
      


let m = message.mentions.members.first() || message.guild.members.get(args[0]);

if (!m) {
return message.channel.send(`Please specify a member!`).then(m => m.delete(5000));
}

if (m.id === message.author.id) {
return message.reply("You cannot ban yourself.").then(m => m.delete(5000));
}

if (!m.bannable) {
return message.reply(`I cannot ban ${m.user.tag}! `).then(m => m.delete(5000));
}

let reason = args.slice(1).join(" ");
if (!reason) reason = "no reason given"
let member = m;

member.ban(reason);
message.channel.send(`${m.user.tag} has been successfully banned.`)
};

  
  
if (command === "warn") {
    var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
        .setColor("#ff0000")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Insufficient Permissions!')
        .setDescription('You need the `VIEW AUDIT LOG` permission to use this command!')
        .setTimestamp();
    var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
        .setColor("#ff0000")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Arguments!')
        .setDescription('Usage: warn [@User] [Reason]')
        .setTimestamp();
    if(!message.member.hasPermission('VIEW_AUDIT_LOG')) return message.channel.send(missingPermissionsEmbed); // Checks if the user has the permission
    let mentioned = message.mentions.users.first(); // Gets the user mentioned!
    if(!mentioned) return message.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message
    let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
    if(!reason) return message.channe.send(missingArgsEmbed); // Triggers if the user dosn't provide a reason for the warning

    var warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
        .setColor("#ff0000")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`You've been warned in ${message.guild.name}`)
        .addField('Warned by', message.author.tag)
        .addField('Reason', reason)
        .setTimestamp();
    mentioned.send(warningEmbed); // DMs the user the above embed!
}
  
  
  if (command=="serverinfo"){
  if (!message.member.hasPermissions('VIEW_AUDIT_LOG')) return message.channel.send(serverinfo2);
        let serverinfo2 = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setTitle('Server Info')
			.setThumbnail(message.guild.iconURL)
			.addField(':arrow_right: Name', message.guild.name, true)
			.addField(':arrow_right: ID', message.guild.id, true)
			.addField(':arrow_right: Region', message.guild.region.toUpperCase(), true)
			.addField(':arrow_right: Creation Date', message.guild.createdAt.toDateString(), true)
			.addField(':arrow_right: Owner', message.guild.owner.user.tag, true)
			.addField(':arrow_right: Members', message.guild.memberCount, true)
        message.channel.send(serverinfo2);
    }
  
    if (command=="avatar"){
    
    let AvatarEmbed = new Discord.RichEmbed()
    .setTitle("/ebavatar to check your avatar")
    .setColor("ff0000")
    .setImage(message.author.avatarURL)
  message.channel.send(AvatarEmbed);
  }
  
});
bot.login('token');

bot.command = new Discord.Collection();


bot.on("message", async (message) => {
if(message.author.bot)return
if(message.channel.type === "dm") return
if(!message.content.startsWith(prefix))return

const args = message.content.slice(prefix.length).trim().split(/ +/g)
const command = args.shift().toLowerCase()

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});



bot.on('ready', () =>{
  bot.user.setActivity('with /help' , {type: "PLAYING"})
  console.log("logged into: " + bot.user.tag)
})
 
if(command === "ping") {
    message.channel.send("BOOM! :boom: Here's your ping: " + Math.round(bot.ping) + "ms!")
  }

if(command === "eval") {
if(message.author.id == "430380605683924993") {
      try {
        const code = args.join(" ");
        let evaled = eval(code);
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
        message.channel.send(evaled)
      }catch (err) {
        console.log(err)
      }}}


if (command === "invite") {
 let embed = new Discord.RichEmbed()
	.setColor('#0099ff')
	.setTitle('Support Menu')
  .addField('Be sure to join the support server! :heart:', '[Click](https://discord.gg/BYY28dk)')
	.addField('Check me out on top.gg! :hugging:', '[Click](https://top.gg/bot/629954111814631437)')
    message.channel.send(embed);
};


  if (command === "say") {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
var sayembed = new Discord.RichEmbed()
  .setTitle('Insufficient Permissions!')
  .setDescription('You need the `MANAGE MESSAGES` permission to use this command!')
      return message.channel.send(sayembed); //done, they need the 'BAN_MEMBERS' permission to use the command.
    let saymessage = args.join(" "); //
    if (!saymessage) return message.channel.send("Please Give Text"); //return a message if they don't provide text.
    message.channel.send(saymessage); //send the message.
   message.delete();
  }


  
if (command==="help") {
 let helpembed = new Discord.RichEmbed()
      .setTitle("Help Menu")
      .setColor("#1d1c1c")
      .addField("/help-misc", "This is the `Miscellaneous Menu`. Usage: `/help-misc`")
      .addField("/help-mod", "This is the `Moderation Menu`. Usage: `/help-mod`")
      .addField("/help-info", "This is the `Information Menu`. Usage: `/help-info`")
    message.channel.send(helpembed);
}

if (command =='help-mod'){
let ModerationEmbed = new Discord.RichEmbed()
      .setColor("#ff0000")
      .setTitle("Help Moderation")
      .addField("Ban", "This command is used to ban the user that is acting badly or against the rules. To use this command you need the `BAN MEMBERS` permission.")
      .addField("Kick", "This command is used kick the user that is acting badly or against the rules. To use this command you need the `KICK MEMBERS` permission.")
      .addField("Purge", "With this command you can delete any messages ranging from 1 to 100. To use this command you need the `MANAGE MESSAGES` permissions.")
      .addField("Warn", "This commands allows you to warn a player that acts against the rules. To use this command you need the `VIEW AUDIT LOG` permission.")
    message.channel.send(ModerationEmbed);
}
  
  if (command ==='help-misc'){
      let MiscEmbed = new Discord.RichEmbed()
      .setColor("#ff0000")
      .setTitle("Help Miscellaneous")
      .addField("Uptime", "With this command you can check how long the bot has been up, and check in how users and how many servers the bot is in!")
      .addField("Invite", "This command allows you to join the support server or either invite the bot to your server.")
      .addField("Avatar", "You can check your avatar.")
message.channel.send(MiscEmbed);
  }
  
  if (command ==='help-info'){
    let InfoEmbed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setTitle("Help Information")
    .addField("Botinfo", "This command is for checking the owner creation date etc. of the bot.")
    .addField("Serverinfo", "Here you can check the servers name and user count and even the region! This command requires the `VIEW AUDIT LOG` permission.")
    message.channel.send(InfoEmbed);
  }
      
  if (command === "botinfo") {
    let embed = new Discord.RichEmbed()
      .setTitle("Bot Info")
      .setColor("#1d1c1c")
      .addField("Bot Created by", "DemonKuboYT#4569")
      .addField("Bot Creation Date", "05.10.2019")
    message.channel.send(embed);
  }
  
  if (command=="uptime") {
let totalSeconds = (bot.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);

    
    let UptimeEmbed = new Discord.RichEmbed()
    .addField("Users", `${bot.users.size}`)
    .addField("Servers", `${bot.guilds.size}`)
    .addField("Uptime", `${days} days, ${hours} hours and ${minutes} minutes `)
    message.channel.send(UptimeEmbed);
    
  }

  if (command === "reset") {
    if (message.author.id == "430380605683924993") {
    } else {
      return message.channel.send("You're not __**OWNER**__");
    }
    {
      resetBot(message.channel);
      function resetBot(channel) {
        message.channel.send("Bot is restarting");
        bot.user.setActivity(`Restarting......`);
        message
          .reply("Bot has been restarted successfully!")
          .then(msg => bot.destroy())
          .then(() => bot.login(process.env.TOKEN));
      }
    }
  }

  if(command === 'purge'){
let has_mngmsg = message.member.permissions.has("MANAGE_MESSAGES")
if(has_mngmsg){
const deleteCount = parseInt(args[0], 10)
if(!deleteCount || deleteCount < 2 || deleteCount > 100)
return message.reply("Please provide a number between 2 and 100 for messages to purge")
const fetched = await message.channel.fetchMessages({limit : deleteCount})
message.channel.bulkDelete(fetched)
}else{
  var purgeembed = new Discord.RichEmbed()
  .setTitle('Insufficient Permissions!')
  .setDescription('You need the `MANAGE MESSAGES` permission to use this command!')
message.reply(purgeembed)
}}
 

  if (command === "kick") {
    let has_kick = message.member.permissions.has("KICK_MEMBERS");
    if (has_kick) {
      const user = message.mentions.users.first() || bot.users.get(args[0]);
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          if (member.kickable)
            await member
              .kick({
                reason: `${args.slice(1).join(" ")}`
              })
              .then(() => {
                message.channel.send(
                  `${message.author.username} kicked ${member.user.username} for ${member.kick.reason}`
                );
              })
              .catch(err => message.channel.send(`Error: ${err}`));
        } else {
          message.channel.send("That user isn't in this server");
        }
      } else {
        message.channel.send("You didn't specify a user to kick");
      }
    } else {
      message.channel.send("You can't use this command");
    }
  }

  
  if (command === "ban") {


    if (!message.member.hasPermission("BAN_MEMBERS")) {
     return message.reply(`You dont have permissions.`).then(m => m.delete(5000));
     }
      

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return message.reply(`You dont have permissions.`).then(m => m.delete(5000));
    }
      


let m = message.mentions.members.first() || message.guild.members.get(args[0]);

if (!m) {
return message.channel.send(`Please specify a member!`).then(m => m.delete(5000));
}

if (m.id === message.author.id) {
return message.reply("You cannot ban yourself.").then(m => m.delete(5000));
}

if (!m.bannable) {
return message.reply(`I cannot ban ${m.user.tag}! `).then(m => m.delete(5000));
}

let reason = args.slice(1).join(" ");
if (!reason) reason = "no reason given"
let member = m;

member.ban(reason);
message.channel.send(`${m.user.tag} has been successfully banned.`)
};

  
  
if (command === "warn") {
    var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
        .setColor("#ff0000")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Insufficient Permissions!')
        .setDescription('You need the `VIEW AUDIT LOG` permission to use this command!')
        .setTimestamp();
    var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
        .setColor("#ff0000")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Arguments!')
        .setDescription('Usage: warn [@User] [Reason]')
        .setTimestamp();
    if(!message.member.hasPermission('VIEW_AUDIT_LOG')) return message.channel.send(missingPermissionsEmbed); // Checks if the user has the permission
    let mentioned = message.mentions.users.first(); // Gets the user mentioned!
    if(!mentioned) return message.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message
    let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
    if(!reason) return message.channe.send(missingArgsEmbed); // Triggers if the user dosn't provide a reason for the warning

    var warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
        .setColor("#ff0000")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`You've been warned in ${message.guild.name}`)
        .addField('Warned by', message.author.tag)
        .addField('Reason', reason)
        .setTimestamp();
    mentioned.send(warningEmbed); // DMs the user the above embed!
}
  
  
  if (command=="serverinfo"){
  if (!message.member.hasPermissions('VIEW_AUDIT_LOG')) return message.channel.send(serverinfo2);
        let serverinfo2 = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setTitle('Server Info')
			.setThumbnail(message.guild.iconURL)
			.addField(':arrow_right: Name', message.guild.name, true)
			.addField(':arrow_right: ID', message.guild.id, true)
			.addField(':arrow_right: Region', message.guild.region.toUpperCase(), true)
			.addField(':arrow_right: Creation Date', message.guild.createdAt.toDateString(), true)
			.addField(':arrow_right: Owner', message.guild.owner.user.tag, true)
			.addField(':arrow_right: Members', message.guild.memberCount, true)
        message.channel.send(serverinfo2);
    }
  
    if (command=="avatar"){
    
    let AvatarEmbed = new Discord.RichEmbed()
    .setTitle("/ebavatar to check your avatar")
    .setColor("ff0000")
    .setImage(message.author.avatarURL)
  message.channel.send(AvatarEmbed);
  }
  
});
app.use(express.static('public'));
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200)
});
app.listen('token');



bot.on("message", async (message) => {
if(message.author.bot)return
if(message.channel.type === "dm") return
if(!message.content.startsWith(prefix))return

const args = message.content.slice(prefix.length).trim().split(/ +/g)
const command = args.shift().toLowerCase()

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});



bot.on('ready', () =>{
  bot.user.setActivity('with /help' , {type: "PLAYING"})
  console.log("logged into: " + bot.user.tag)
})
 
if(command === "ping") {
    message.channel.send("BOOM! :boom: Here's your ping: " + Math.round(bot.ping) + "ms!")
  }

if(command === "eval") {
if(message.author.id == "430380605683924993") {
      try {
        const code = args.join(" ");
        let evaled = eval(code);
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
        message.channel.send(evaled)
      }catch (err) {
        console.log(err)
      }}}


if (command === "invite") {
 let embed = new Discord.RichEmbed()
	.setColor('#0099ff')
	.setTitle('Support Menu')
  .addField('Be sure to join the support server! :heart:', '[Click](https://discord.gg/BYY28dk)')
	.addField('Check me out on top.gg! :hugging:', '[Click](https://top.gg/bot/629954111814631437)')
    message.channel.send(embed);
};


  if (command === "say") {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
var sayembed = new Discord.RichEmbed()
  .setTitle('Insufficient Permissions!')
  .setDescription('You need the `MANAGE MESSAGES` permission to use this command!')
      return message.channel.send(sayembed); //done, they need the 'BAN_MEMBERS' permission to use the command.
    let saymessage = args.join(" "); //
    if (!saymessage) return message.channel.send("Please Give Text"); //return a message if they don't provide text.
    message.channel.send(saymessage); //send the message.
   message.delete();
  }


  
if (command==="help") {
 let helpembed = new Discord.RichEmbed()
      .setTitle("Help Menu")
      .setColor("#1d1c1c")
      .addField("/help-misc", "This is the `Miscellaneous Menu`. Usage: `/help-misc`")
      .addField("/help-mod", "This is the `Moderation Menu`. Usage: `/help-mod`")
      .addField("/help-info", "This is the `Information Menu`. Usage: `/help-info`")
    message.channel.send(helpembed);
}

if (command =='help-mod'){
let ModerationEmbed = new Discord.RichEmbed()
      .setColor("#ff0000")
      .setTitle("Help Moderation")
      .addField("Ban", "This command is used to ban the user that is acting badly or against the rules. To use this command you need the `BAN MEMBERS` permission.")
      .addField("Kick", "This command is used kick the user that is acting badly or against the rules. To use this command you need the `KICK MEMBERS` permission.")
      .addField("Purge", "With this command you can delete any messages ranging from 1 to 100. To use this command you need the `MANAGE MESSAGES` permissions.")
      .addField("Warn", "This commands allows you to warn a player that acts against the rules. To use this command you need the `VIEW AUDIT LOG` permission.")
    message.channel.send(ModerationEmbed);
}
  
  if (command ==='help-misc'){
      let MiscEmbed = new Discord.RichEmbed()
      .setColor("#ff0000")
      .setTitle("Help Miscellaneous")
      .addField("Uptime", "With this command you can check how long the bot has been up, and check in how users and how many servers the bot is in!")
      .addField("Invite", "This command allows you to join the support server or either invite the bot to your server.")
      .addField("Avatar", "You can check your avatar.")
message.channel.send(MiscEmbed);
  }
  
  if (command ==='help-info'){
    let InfoEmbed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setTitle("Help Information")
    .addField("Botinfo", "This command is for checking the owner creation date etc. of the bot.")
    .addField("Serverinfo", "Here you can check the servers name and user count and even the region! This command requires the `VIEW AUDIT LOG` permission.")
    message.channel.send(InfoEmbed);
  }
      
  if (command === "botinfo") {
    let embed = new Discord.RichEmbed()
      .setTitle("Bot Info")
      .setColor("#1d1c1c")
      .addField("Bot Created by", "DemonKuboYT#4569")
      .addField("Bot Creation Date", "05.10.2019")
    message.channel.send(embed);
  }
  
  if (command=="uptime") {
let totalSeconds = (bot.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);

    
    let UptimeEmbed = new Discord.RichEmbed()
    .addField("Users", `${bot.users.size}`)
    .addField("Servers", `${bot.guilds.size}`)
    .addField("Uptime", `${days} days, ${hours} hours and ${minutes} minutes `)
    message.channel.send(UptimeEmbed);
    
  }

  if (command === "reset") {
    if (message.author.id == "430380605683924993") {
    } else {
      return message.channel.send("You're not __**OWNER**__");
    }
    {
      resetBot(message.channel);
      function resetBot(channel) {
        message.channel.send("Bot is restarting");
        bot.user.setActivity(`Restarting......`);
        message
          .reply("Bot has been restarted successfully!")
          .then(msg => bot.destroy())
          .then(() => bot.login(process.env.TOKEN));
      }
    }
  }

  if(command === 'purge'){
let has_mngmsg = message.member.permissions.has("MANAGE_MESSAGES")
if(has_mngmsg){
const deleteCount = parseInt(args[0], 10)
if(!deleteCount || deleteCount < 2 || deleteCount > 100)
return message.reply("Please provide a number between 2 and 100 for messages to purge")
const fetched = await message.channel.fetchMessages({limit : deleteCount})
message.channel.bulkDelete(fetched)
}else{
  var purgeembed = new Discord.RichEmbed()
  .setTitle('Insufficient Permissions!')
  .setDescription('You need the `MANAGE MESSAGES` permission to use this command!')
message.reply(purgeembed)
}}
 

  if (command === "kick") {
    let has_kick = message.member.permissions.has("KICK_MEMBERS");
    if (has_kick) {
      const user = message.mentions.users.first() || bot.users.get(args[0]);
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          if (member.kickable)
            await member
              .kick({
                reason: `${args.slice(1).join(" ")}`
              })
              .then(() => {
                message.channel.send(
                  `${message.author.username} kicked ${member.user.username} for ${member.kick.reason}`
                );
              })
              .catch(err => message.channel.send(`Error: ${err}`));
        } else {
          message.channel.send("That user isn't in this server");
        }
      } else {
        message.channel.send("You didn't specify a user to kick");
      }
    } else {
      message.channel.send("You can't use this command");
    }
  }

  
  if (command === "ban") {


    if (!message.member.hasPermission("BAN_MEMBERS")) {
     return message.reply(`You dont have permissions.`).then(m => m.delete(5000));
     }
      

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return message.reply(`You dont have permissions.`).then(m => m.delete(5000));
    }
      


let m = message.mentions.members.first() || message.guild.members.get(args[0]);

if (!m) {
return message.channel.send(`Please specify a member!`).then(m => m.delete(5000));
}

if (m.id === message.author.id) {
return message.reply("You cannot ban yourself.").then(m => m.delete(5000));
}

if (!m.bannable) {
return message.reply(`I cannot ban ${m.user.tag}! `).then(m => m.delete(5000));
}

let reason = args.slice(1).join(" ");
if (!reason) reason = "no reason given"
let member = m;

member.ban(reason);
message.channel.send(`${m.user.tag} has been successfully banned.`)
};

  
  
if (command === "warn") {
    var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
        .setColor("#ff0000")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Insufficient Permissions!')
        .setDescription('You need the `VIEW AUDIT LOG` permission to use this command!')
        .setTimestamp();
    var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
        .setColor("#ff0000")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Arguments!')
        .setDescription('Usage: warn [@User] [Reason]')
        .setTimestamp();
    if(!message.member.hasPermission('VIEW_AUDIT_LOG')) return message.channel.send(missingPermissionsEmbed); // Checks if the user has the permission
    let mentioned = message.mentions.users.first(); // Gets the user mentioned!
    if(!mentioned) return message.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message
    let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
    if(!reason) return message.channe.send(missingArgsEmbed); // Triggers if the user dosn't provide a reason for the warning

    var warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
        .setColor("#ff0000")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`You've been warned in ${message.guild.name}`)
        .addField('Warned by', message.author.tag)
        .addField('Reason', reason)
        .setTimestamp();
    mentioned.send(warningEmbed); // DMs the user the above embed!
}
  
  
  if (command=="serverinfo"){
  if (!message.member.hasPermissions('VIEW_AUDIT_LOG')) return message.channel.send(serverinfo2);
        let serverinfo2 = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setTitle('Server Info')
			.setThumbnail(message.guild.iconURL)
			.addField(':arrow_right: Name', message.guild.name, true)
			.addField(':arrow_right: ID', message.guild.id, true)
			.addField(':arrow_right: Region', message.guild.region.toUpperCase(), true)
			.addField(':arrow_right: Creation Date', message.guild.createdAt.toDateString(), true)
			.addField(':arrow_right: Owner', message.guild.owner.user.tag, true)
			.addField(':arrow_right: Members', message.guild.memberCount, true)
        message.channel.send(serverinfo2);
    }
  
    if (command=="avatar"){
    
    let AvatarEmbed = new Discord.RichEmbed()
    .setTitle("/ebavatar to check your avatar")
    .setColor("ff0000")
    .setImage(message.author.avatarURL)
  message.channel.send(AvatarEmbed);
  }
  
});
bot.login('token');