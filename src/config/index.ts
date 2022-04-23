import * as dotenv from "dotenv";

import { Config } from '../types';

dotenv.config();

const config: Config = {
  port: parseInt(process.env.PORT as string, 10) || 3000,
};

export default config;
