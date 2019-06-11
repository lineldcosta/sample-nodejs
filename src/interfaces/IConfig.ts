export interface ILog {
  level: string;
  logRequestsEnabled: boolean;
}

export interface IJwt {
  secret: string;
  expiresInHours?: number;
}

export interface IApi {
  prefix?: string;
  port?: number | string;
  jwt?: IJwt;
  bcrypt?: Record<string, number>;
}

export interface IConfig {
  appname?: string;
  baseurl?: string;
  env?: string;
  api?: IApi;
  logs?: ILog;
}
