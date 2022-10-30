import { NestFactory } from "@nestjs/core";
import { AppModule } from "@modules";
import { Logger, ValidationPipe } from "@nestjs/common";
import * as chalk from "chalk";
import * as compression from "compression";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
import * as rateLimit from "express-rate-limit";
import { MyLogger } from "@config";
import {
  ErrorsInterceptor,
  HttpExceptionFilter,
  LoggerMiddleware,
  LoggingInterceptor,
  TimeoutInterceptor,
  TransformInterceptor
} from "@common";

declare const module: any;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: new MyLogger()
    });

    const NODE_ENV = process.env.NODE_ENV;

    app.setGlobalPrefix(process.env.DOMAIN);

    // NOTE: adapter for e2e testing
    app.getHttpAdapter();

    // NOTE: compression
    app.use(compression());

    // NOTE: added security
    app.use(helmet());

    app.enableCors();

    // NOTE: body parser
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(
      bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000
      })
    );

    // NOTE: rateLimit
    app.use(
      rateLimit({
        windowMs: 1000 * 60 * 60, // an hour
        max: process.env.RATE_LIMIT_MAX, // limit each IP to 100 requests per windowMs
        message:
          "⚠️  Too many request created from this IP, please try again after an hour"
      })
    );

    // NOTE:loggerMiddleware
    NODE_ENV !== "testing" && app.use(LoggerMiddleware);

    // NOTE: filters
    app.useGlobalFilters(new HttpExceptionFilter());

    // NOTE: interceptors
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalInterceptors(new ErrorsInterceptor());
    app.useGlobalInterceptors(new TimeoutInterceptor());

    // NOTE: global nest setup
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true })
    );
    app.enableShutdownHooks();

    await app.listen(process.env.PORT);

    /*
		if (module.hot) {
			module.hot.accept();
			module.hot.dispose(() => app.close());
		}
*/
    NODE_ENV !== "production"
      ? (Logger.log(
          `🤬  Application is running on: ${await app.getUrl()}`,
          "NestJS",
          false
        ),
        Logger.log(
          `🚀  Server ready at http://${process.env.END_POINT}:${chalk
            .hex(process.env.PRIMARY_COLOR)
            .bold(process.env.PORT.toString())}/${process.env.DOMAIN}`,
          "Bootstrap",
          false
        ))
      : Logger.log(
          `🚀  Server is listening on port ${chalk
            .hex(process.env.PRIMARY_COLOR)
            .bold(process.env.PORT.toString())}`,
          "Bootstrap",
          false
        );
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, "", "Bootstrap", false);
    process.exit();
  }
}

bootstrap().catch(e => {
  Logger.error(`❌  Error starting server, ${e}`, "", "Bootstrap", false);
  throw e;
});
