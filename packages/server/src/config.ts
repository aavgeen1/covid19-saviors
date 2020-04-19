import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface IConfig {
  port: number;
  debugLogging: boolean;
  dbsslconn: boolean;
  jwtSecret: string;
  dbuser: string;
  dbpassword: string;
}

const config: IConfig = {
  port: +process.env.PORT || 8080,
  debugLogging: process.env.NODE_ENV === 'development',
  dbsslconn: process.env.NODE_ENV !== 'development',
  jwtSecret: process.env.JWT_SECRET || 'meranaam',
  dbuser: process.env.DB_USER,
  dbpassword: process.env.DB_PASSWORD,
};

export { config };
