import { AuthService } from '@/auth/auth.service';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @MessagePattern('notification.signup')
  // @UseFilters(new NoExceptionFilter())
  async signup(
    @Payload('value')
    {
      name,
      email,
      userReference,
      confirmToken,
      baseUrlConfirmation,
      phone,
    }: {
      name: string;
      email: string;
      phone: string;
      userReference: string;
      confirmToken: string;
      baseUrlConfirmation: string;
    },
  ): Promise<void> {
    this.logger.log(
      `Signup email: ${JSON.stringify({
        name,
        email,
      })}`,
    );
    await this.authService.signup({
      name,
      email,
      userReference,
      confirmToken,
      baseUrlConfirmation,
      phone,
    });
  }

  @MessagePattern('notification.resend-signup-confirm-email')
  async resendSignupConfirmEmail(
    @Payload('value')
    {
      confirmToken,
      baseUrlConfirmation,
      email,
    }: {
      confirmToken: string;
      baseUrlConfirmation: string;
      email: string;
    },
  ): Promise<void> {
    this.logger.log(
      `Resend signup confirm email: ${JSON.stringify({
        email,
      })}`,
    );
    await this.authService.resendSignupConfirmEmail({
      email,
      confirmToken,
      baseUrlConfirmation,
    });
  }
}
