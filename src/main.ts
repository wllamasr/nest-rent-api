import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot(), { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  await app.listen(3000);
}
bootstrap();
