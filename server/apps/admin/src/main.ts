import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //解决跨域
  app.enableCors()
 
  const options = new DocumentBuilder()
  .setTitle('全栈之巅视频网站-后台管理API')
  .setDescription('供后台管理端调用的服务端API')
  .setVersion('1.0')
  .build();
 const document = SwaggerModule.createDocument(app, options);
 SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
  console.log('http://localhost:3000/api-docs')
}
bootstrap();
