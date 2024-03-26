import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { EmailService } from 'src/services/email.service';

@Module({
  controllers: [UserController],
  providers: [EmailService],
})
export class UserModule {}
