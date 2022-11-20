import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, EventsModule, UserModule } from './features';

@Module({
   imports: [
   	ConfigModule.forRoot({ isGlobal: true }),
   	AuthModule,
   	EventsModule,
   	UserModule,
   ],
})
export class AppModule {}
