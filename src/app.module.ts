import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "@nestjs/config"
import { HabitModule } from './habit/habit.module';
import { HabitLogModule } from './habit-log/habit-log.module';
import { SystemModule } from './system/system.module';
import { IdentityModule } from './identity/identity.module';
import { GoalModule } from './goal/goal.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),
    HabitModule,
    HabitLogModule,
    SystemModule,
    IdentityModule,
    GoalModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
