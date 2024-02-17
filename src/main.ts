import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerCreate = (app: INestApplication) => {
    const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle("Payment API")
      .setDescription("")
      .addBearerAuth()
      .build();
    const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api/docs", app, document);
  };

  swaggerCreate(app);

  await app.listen(3000);
}
bootstrap();
