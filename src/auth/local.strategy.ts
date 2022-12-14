import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(
      // {jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      // secretOrKey: 'asdf',}
      );
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException("username or password is not correct");
    }
    return user;
  }
  // async validateToken( access_token: string): Promise<any> {
  //   const user = await this.authService.check(access_token);
  //   if (!user) {
  //     throw new UnauthorizedException("token is not correct");
  //   }
  //   return user;
  // }
}