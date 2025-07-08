import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature({
      type: "postgres",
      

    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
