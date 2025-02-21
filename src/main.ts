import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); 
  app.useGlobalPipes(new ValidationPipe()); 
  await app.listen(3000, '0.0.0.0');
  
  const routes = app.getHttpAdapter().getInstance()._router.stack;
  
  console.log('Available routes:');
  
  routes.forEach(route => {
    if (route.route) {
      console.log(`${route.route.stack[0].method.toUpperCase()} ${route.route.path}`);
    }
  });

  console.log('Application is running on: http://localhost:3000');
}
bootstrap();
