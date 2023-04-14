import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './helpers/all-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ enableDebugMessages: true }));
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.setGlobalPrefix('api');

  // Swagger set up
  const config = new DocumentBuilder()
    .setTitle('NSystem Node')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true
    }
  };
  SwaggerModule.setup('docs', app, document, customOptions);

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port || 3000);
}

bootstrap();
