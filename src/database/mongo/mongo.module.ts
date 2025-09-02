import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.DB_URI,
        // onConnectionCreate: (connection: Connection) => {
        //   connection.on('connected', () => console.log('Database connected'));
        // },
        connectionErrorFactory: (error: Error) =>
          new Error('Database connection error : ' + error),
      }),
    }),
  ],
})
export class MongoModule {}
