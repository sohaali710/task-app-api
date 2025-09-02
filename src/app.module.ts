import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongoModule } from './database/mongo/mongo.module';
import { TaskModule } from './task/task.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      expandVariables: true, // if .env has VAR1=abc and VAR2=xyzabc so VAR2 can = xyz${VAR1}

      validationSchema: Joi.object({
        PORT: Joi.number().port().required().default(3000),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        DB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),

    MongoModule,
    UserModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // { provide: 'APP_INTERCEPTOR', useClass: ClassSerializerInterceptor }, // to use globally, but the interceptor has a dependency (constructor)
  ],
})
export class AppModule {}
