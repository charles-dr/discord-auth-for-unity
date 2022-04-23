import * as dotenv from "dotenv";

import { Config } from '../types';

dotenv.config();

const config: Config = {
  port: parseInt(process.env.PORT as string, 10) || 3000,
  discord: {
    clientId: "695192092061859850",
    clientSecret: "7OgYcu5BNNdgi0XWytudFe2XXM909",
    scopes: ['identity', 'guilds'],
    communityServerId: '713213039079587861',
  },
};

export default config;
