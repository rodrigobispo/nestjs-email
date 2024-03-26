import { EventPayloadsDTO } from '@/dto/event.payload';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  @OnEvent('user.welcome')
  async welcomeEmail(data: EventPayloadsDTO['user.welcome']): Promise<void> {
    const { name, email } = data;

    this.mailerService.sendMail({
      to: email,
      subject: `Welcome ${name}!`,
      template: './welcome',
      context: { name },
    });
  }

  @OnEvent('user.reset-password')
  async forgotPasswordEmail(data: EventPayloadsDTO['user.reset-password']) {
    const { name, email, link } = data;

    const subject = `Company: Reset Password`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './forgot-password',
      context: {
        link,
        name,
      },
    });
  }

  @OnEvent('user.verify-email')
  async verifyEmail(data: EventPayloadsDTO['user.verify-email']) {
    const { name, email, otp } = data;

    const subject = `Company: OTP To Verify Email`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './verify-email',
      context: {
        otp,
        name,
      },
    });
  }

  getMessageTest(): string {
    return 'Controller Email!';
  }
}
