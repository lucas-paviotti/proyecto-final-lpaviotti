import * as dotenv from 'dotenv';

dotenv.config();

export const { PORT, NODE_ENV: envType, HOST, ADMIN: isAdmin } = process.env;