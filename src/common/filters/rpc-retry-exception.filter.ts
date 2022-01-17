import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';

@Catch()
export class RpcRetryExceptionFilter extends BaseRpcExceptionFilter {
  private retries: { message: any; retry: number }[] = [];
  private readonly logger = new Logger(RpcRetryExceptionFilter.name);

  constructor(private readonly MAX_RETRY) {
    super();
  }

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToRpc().getContext();
    const message = ctx.getMessage();
    const retryMessage = this.retries.find(
      (retry) => retry.message === JSON.stringify(message),
    );
    if (retryMessage) {
      retryMessage.retry += 1;
      if (retryMessage.retry < this.MAX_RETRY) {
        throw exception;
      } else {
        this.retries.splice(this.retries.indexOf(retryMessage), 1);
        this.logger.error('FAILED MESSAGE: ' + retryMessage.message);
      }
    } else {
      this.retries.push({
        message: JSON.stringify(message),
        retry: 0,
      });
      throw exception;
    }
  }
}
