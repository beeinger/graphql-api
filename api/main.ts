import * as dree from "dree";

import { AppModule } from "../src/app.module";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

export default async function bootstrap() {
  const string = dree.parse(process.cwd(), {
    exclude: [/node_modules/, /recipes/, /common/],
  });
  console.log(string);

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
