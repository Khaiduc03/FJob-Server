import { join } from 'path';
import { CacheModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FcmModule } from '@doracoder/fcm-nestjs';

import { AppController } from './app.controller';
import { TypeOrmService } from './configs';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { CloudModule, ImageController, ImageModule, ImageService, JobModule, UserModule } from './modules';
import { CategoryModule } from './modules/category/category.module';
import { PostModule } from './modules/post/post.module';
import { CompanyModule } from './modules/company/company.module';
import { UserJobModule } from './modules/user_job/user_job.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmService,
        }),
        CacheModule.register({
            ttl: 5,
            max: 10,
        }),
        FcmModule.forRoot({
            firebaseSpecsPath: join(__dirname, '../services-account.json'),
        }),
        ScheduleModule.forRoot(),
        CloudModule,
        AuthModule,
        UserModule,
        JobModule,
        ImageModule,
        CategoryModule,
        PostModule,
        CompanyModule,
        UserJobModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
