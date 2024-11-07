import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlarmEntity } from "./entities/alarm.entity";
import { CreateAlarmRepository } from "src/alarms/application/ports/create-alarm.repository";
import { InMemoryAlarmRepository } from "./repositories/alarm.repository";

@Module({
  imports: [TypeOrmModule.forFeature([AlarmEntity])],
  providers: [
    {
      provide: CreateAlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
  ],
  exports: [CreateAlarmRepository],
})
export class OrmAlartPersistenceModule {}
