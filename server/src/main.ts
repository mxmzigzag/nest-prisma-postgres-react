import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: process.env.CLIENT_ADDRESS });
  app.use(cookieParser());

  await app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
}

start();
