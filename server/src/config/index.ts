// Entities
import { User } from '../modules/user/user.entity';

export const config = () => ({
  port: Number(process.env.APP_PORT),
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expiryTime: process.env.JWT_EXPIRY_TIME,
    resetSecretKey: process.env.JWT_RESET_SECRET,
  },
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.DB_SYNCHRONIZE,
    entities: [User],
  },
});
