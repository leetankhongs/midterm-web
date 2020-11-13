import { Controller, Get, Request, Post, UseGuards, Headers, Res, HttpService } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';


@Controller()
export class AppController {
  constructor(private authService: AuthService) { }


  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const result = await this.authService.login(req.user);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('google')
  async getGoogleLogin(@Headers('Authorization') token: string) {
    return this.authService.getGoogleLogin(token);

  }

  @Get('facebook')
  async getFacebookLogin(@Headers('accessToken') token: string, @Headers('userID') userID: string) {
    return await this.authService.getFacebookLogin(token, userID);
  }
}
