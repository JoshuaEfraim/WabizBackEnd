import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // global endpoints prefix
    app.setGlobalPrefix('api/v1');
    // handle all user input validation globally
    app.useGlobalPipes(new ValidateInputPipe());

    // Create Swagger configuration
    const config = new DocumentBuilder()
      .setTitle('My API')
      .setDescription('API description')
      .setVersion('1.0')
      .build();
    
    // Create the Swagger document
    const document = SwaggerModule.createDocument(app, config);
    
    // Set up the Swagger UI at /api
    SwaggerModule.setup('api', app, document);
  
    await app.listen(3000);
}
bootstrap();