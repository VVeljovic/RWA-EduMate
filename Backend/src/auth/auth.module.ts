import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './localStrategy/local.strategy';
import { UserModule } from 'src/user/user.module';
import{PassportModule}from'@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwtStrategy/jwt.strategy';
@Module({
  imports:[UserModule,PassportModule,JwtModule.register({
    secret:'test',
    signOptions:{expiresIn:'1d'},
  })],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
