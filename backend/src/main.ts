import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as bodyParser from "body-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
   const app = await NestFactory.create<NestExpressApplication>(AppModule);
   app.enableCors();
   app.use(bodyParser.json({ limit: '10mb' }));
   app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
   app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
   await app.listen(3000);
}

bootstrap();
