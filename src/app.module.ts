import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './Users/users.module';
import { AuthModule } from './Auth/auth.module';
import { User } from './Users/user.entity'; 
import { JwtModule } from '@nestjs/jwt'; 
import { JwtStrategy } from './Auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT), 
      username: process.env.DB_USER, 
      password: process.env.DB_PASSWORD, 
      database: process.env.DB_NAME, 
      entities: [User], 
      synchronize: true, 
    }),
    UsersModule, 
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  providers: [JwtStrategy], 
})
export class AppModule {}
