import { ResetPasswordService } from '@/reset-password/reset-password.service';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('reset-password')
export class ResetPasswordController {
  private readonly logger = new Logger(ResetPasswordController.name);

  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @MessagePattern('notification.request-reset-password')
  async requestResetPassword(
    @Payload('value')
    {
      resetPasswordToken,
      baseUrlResetPassword,
      email,
    }: {
      resetPasswordToken: string;
      baseUrlResetPassword: string;
      email: string;
    },
  ): Promise<void> {
    this.logger.log(
      `Request reset password: ${JSON.stringify({
        email,
      })}`,
    );
    throw new Error('WOWOWOWO');
    // await this.resetPasswordService.requestResetPassword({
    //   email,
    //   resetPasswordToken,
    //   baseUrlResetPassword,
    // });
  }
}
