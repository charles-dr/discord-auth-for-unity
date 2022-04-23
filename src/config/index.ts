import * as dotenv from "dotenv";

import { Config } from '../types';

dotenv.config();

const config: Config = {
  port: parseInt(process.env.PORT as string, 10) || 3000,
  discord: {
    clientId: process.env.DISCORD_APP_ID || "",
    clientSecret: process.env.DISCORD_APP_SECRET || "",
    scopes: (process.env.DISCORD_AUTH_SCOPE || "")
      .split(' ').map(it => it.trim()),
    botToken: process.env.DISCORD_BOT_TOKEN || "",
    communityServerId: process.env.DISCORD_COMMUNITY_SERVER_ID || "",
  },
};

export default config;
