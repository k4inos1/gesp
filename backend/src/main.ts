import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import helmet from "helmet";
import * as csurf from "csurf";
import * as cors from "cors";
import * as winston from "winston";
import * as Sentry from "@sentry/node";
import { PrometheusService } from "@willsoto/nestjs-prometheus";
import { ExceptionFilter } from "./filters/exception.filter"; // Import your custom exception filter
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Sentry initialization
  Sentry.init({ dsn: "YOUR_SENTRY_DSN" });
  app.use(Sentry.Handlers.requestHandler());

  // Winston logger setup
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "error.log", level: "error" }),
      new winston.transports.File({ filename: "combined.log" }),
    ],
  });

  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
  });

  app.use(helmet());
  app.use(cors());
  app.use(csurf()); // Descomenta si configuras CSRF correctamente

  // Global exception filter
  app.useGlobalFilters(new ExceptionFilter(logger, Sentry)); // Register the global exception filter

  // Swagger setup
  const options = new DocumentBuilder()
    .setTitle("API Documentation")
    .setDescription("API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  // Prometheus integration
  const prometheusService = app.get(PrometheusService);
  prometheusService.start();

  await app.listen(3000);
}
bootstrap();
