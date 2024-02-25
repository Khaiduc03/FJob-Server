import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { LoggerMiddleware, TimeoutInterceptor } from './core';
import { NODE_ENV, PORT } from './environments';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new Logger(),
    });

    // NOTE: adapter for e2e testing
    app.getHttpAdapter();

    // NOTE: rateLimit
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
            standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        })
    );

    // NOTE:loggerMiddleware
    NODE_ENV !== 'testing' && app.use(LoggerMiddleware);

    // NOTE: interceptors
    app.useGlobalInterceptors(new TimeoutInterceptor());

    // NOTE: global nest setup
    app.useGlobalPipes(new ValidationPipe());

    app.enableShutdownHooks();

    await app.listen(PORT);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap().catch((error) => {
    Logger.error(`🆘️  Error starting server, ${error}`, '', 'Bootstrap', false);
    process.exit(1);
});
