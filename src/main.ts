import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { configureSetup } from './utility/config';
import { configureSecurity } from './utility/security';
dotenv.config();
// import * as http from 'http';
// import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureSecurity(app);
	configureSetup(app);
  // app.useWebSocketAdapter(new IoAdapter(http.createServer(app.getHttpServer())));
  await app.listen(4000);
}
bootstrap();
