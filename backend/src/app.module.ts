import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{
        ttl: 60000, // 1 minuto en milisegundos
        limit: 10,   // 10 peticiones por minuto
      }]
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}