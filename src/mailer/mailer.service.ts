import { Injectable, Logger } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';

@Injectable()
export class MailerService {
  private logger = new Logger(MailerService.name);
  public constructor(
    @InjectSendGrid() private readonly sendGridService: SendGridService,
  ) {}

  async send({
    from,
    to,
    subject,
    bcc,
    html,
  }: {
    from: string;
    to: string;
    subject: string;
    bcc: string;
    html: string;
  }) {
    this.logger.log(`Send email to ${to}`);
    await this.sendGridService.send({
      from,
      to,
      subject,
      bcc,
      html,
    });
  }
}
