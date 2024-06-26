import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*'
    }
  });

  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('API Almoxarifado')
    .setDescription('API Almoxarifado')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('help', app, document)
  
  await app.listen(3000);
}
bootstrap();
