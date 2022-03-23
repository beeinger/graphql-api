import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { readdir } from "fs";

async function bootstrap() {
  readdir(process.cwd(), (err, files) => {
    files.forEach((file) => {
      console.log(file);
    });
  });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
