import { MailerService } from '@/mailer/mailer.service';
import {
  ArgumentsHost,
  Catch,
  Controller,
  Logger,
  UseFilters,
} from '@nestjs/common';
import {
  BaseRpcExceptionFilter,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller('mailer')
export class MailerController {
  private readonly logger = new Logger(MailerController.name);

  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern('notification.signup')
  // @UseFilters(new NoExceptionFilter())
  async signup(
    @Payload('value')
    {
      name,
      email,
      userReference,
    }: {
      name: string;
      email: string;
      userReference: string;
    },
  ): Promise<void> {
    this.logger.log(
      `Signup email: ${JSON.stringify({
        name,
        email,
      })}`,
    );
    await this.mailerService.signup({
      name,
      email,
      userReference,
    });
    throw 'THROW ANY ERROR';
  }
}
