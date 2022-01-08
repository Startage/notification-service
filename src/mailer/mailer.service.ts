import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';

@Injectable()
export class MailerService {
  public constructor(
    @InjectSendGrid() private readonly sendGridService: SendGridService,
  ) {}

  async signup({
    name,
    email,
    userReference,
  }: {
    name: string;
    email: string;
    userReference: string;
  }) {
    console.log('erntrou');
  }
}
