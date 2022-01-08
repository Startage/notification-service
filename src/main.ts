import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const brokersStr = process.env.KAFKA_BROKERS;
  let brokers = [];
  if (brokersStr) {
    brokers = brokersStr.split(',').filter((brokerUrl) => !!brokerUrl);
  }
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'notification',
          brokers: brokers,
        },
        consumer: {
          groupId: 'notification-consumer',
          allowAutoTopicCreation: true,
          retry: {
            retries: 5,
            initialRetryTime: 1000,
            // initialRetryTime: 1000 * 60,
          },
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
