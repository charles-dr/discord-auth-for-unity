export type Config = {
  port: number;
  discord: IDiscordConfig;
}

export interface IDiscordConfig {
  clientId: string;
  clientSecret: string;
  scopes: string[];
  communityServerId: string;
  botToken:string;
}

export interface IOAuth2TokenResponse {
  access_token: string;
  expires_in: number;
  refersh_token: string;
  scope: string;
  token_type: string;
}

export interface IGuild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
  features: string[];
  permissions_new: string;
}