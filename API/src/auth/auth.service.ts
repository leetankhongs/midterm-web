import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants'
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("384818698512-6un3oj0o5bvhpah1qcrkhcjctv2a6djl.apps.googleusercontent.com")

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && bcrypt.compareSync(pass, user.password) ) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {email: user.email, sub: user._id} ;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getGoogleLogin(token: string){
    const result = await client.verifyIdToken({ idToken: token, audience: "384818698512-6un3oj0o5bvhpah1qcrkhcjctv2a6djl.apps.googleusercontent.com" })

    if (result.payload.email_verified) {
      const user = await this.usersService.findOne(result.payload.email);

      if (user) {
        return await this.login(user);
      } else {
        const newUserID = await this.usersService.createNewUser(result.payload.family_name, result.payload.given_name, result.payload.email, result.payload.email + jwtConstants.secret, "");
        const newUser = await this.usersService.findOne(result.payload.email);
        return await this.login(newUser);
      }
    }
  }

  async getFacebookLogin(token: string, userID: string) {
    const urlGraphFacebook = 'https://graph.facebook.com/v2.11/' + userID + '/?fields=id,name,email&access_token=' + token;

    const res = await fetch(urlGraphFacebook, {
      method: 'GET'
    });

    const result = await res.json();
    const { email, name } = result;

    const user = await this.usersService.findOne(email);

    if (user !== null) {
      return await this.login(user);
    } else {
      const newUserID = await this.usersService.createNewUser("", name, email, email + jwtConstants.secret, "");
      const newUser = await this.usersService.findOne(email);
      return await this.login(newUser);
    }

  }
}