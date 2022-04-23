import { Client, Intents, Guild } from 'discord.js';
import config from '../config';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.login('Njk1MTkyMDkyMDYxODU5ODUw.XtIlWQ.bjpCdzNOYGIIOCnuoazMNBstmf4');

let guild: Guild;

export const initializeBot = async () => {
  client.on('ready', () => {
    console.log(`Logged in as ${client?.user?.tag}!`);
  });

  guild = await client.guilds.fetch(config.discord.communityServerId);
};

export const checkUserInCommunity = (userId: string) => {
  return guild.members.fetch(userId)
    .then(member => member.user);
}
