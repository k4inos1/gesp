import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import * as helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de seguridad
  app.use(helmet());
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:4200",
    credentials: true,
  });

  // Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
