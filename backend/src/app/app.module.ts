import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { TestModule } from "./test.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { MetricsModule } from "@willsoto/nestjs-prometheus";

@Module({
  imports: [
    TestModule,
    UsersModule,
    AuthModule,
    TypeOrmModule,
    ConfigModule,
    MetricsModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
