import { Body, Controller, Get, Post, Query, Redirect } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { randomBytes } from 'crypto';

@Controller('user')
export class UserController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Post('sign-up')
  async create(@Body() body) {
    this.eventEmitter.emit('user.welcome', {
      name: body.name,
      email: body.email,
    });
  }

  @Post('verify-email')
  async verifyEmail(@Body() body) {
    const randomOTP = randomBytes(3).toString('hex').slice(0, 6);

    this.eventEmitter.emit('user.verify-email', {
      name: body.name,
      email: body.email,
      otp: randomOTP,
    });
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body) {
    this.eventEmitter.emit('user.reset-password', {
      name: body.name,
      email: body.email,
      link: 'www.google.com',
    });
  }

  @Get('testmail')
  @Redirect('https://docs.nestjs.com', 302)
  getMessageTest(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
