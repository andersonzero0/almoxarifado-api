import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Almoxarifado')
    .setDescription('API Almoxarifado')
    .setVersion('1.0')
    .addTag('almoxarifado')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('docs', app, document)
  
  await app.listen(3000);
}
bootstrap();
