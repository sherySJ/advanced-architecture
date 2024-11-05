import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlarmEntity } from "./entities/alarm.entity";
import { AlarmRepository } from "src/alarms/application/ports/alarm.repository";
import { InMemoryAlarmRepository } from "./repositories/alarm.repository";

@Module({
  imports: [TypeOrmModule.forFeature([AlarmEntity])],
  providers: [
    {
      provide: AlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
  ],
  exports: [AlarmRepository],
})
export class OrmAlartPersistenceModule {}
