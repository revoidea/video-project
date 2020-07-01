import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //解决跨域
  app.enableCors()
 
  //静态文件托管
  app.useStaticAssets('uploads',{
    prefix:'/uploads'
  })

  const options = new DocumentBuilder()
  .setTitle('全栈之巅视频网站-后台管理API')
  .setDescription('供后台管理端调用的服务端API')
  .setVersion('1.0')
  .build();
 const document = SwaggerModule.createDocument(app, options);
 SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.ADMIN_PORT || 3000
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`)
}
bootstrap();
