import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import moment from 'moment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot(), { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  await app.listen(4000);

  //set default moment format
  moment.defaultFormat = 'YYYY-MM-DD';
}
bootstrap();
