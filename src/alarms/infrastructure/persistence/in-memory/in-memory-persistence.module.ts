import { Module } from "@nestjs/common";
import { CreateAlarmRepository } from "src/alarms/application/ports/create-alarm.repository";
import { InMemoryAlarmRepository } from "./repositories/alarm.repository";
import { FindAlarmsRepository } from "src/alarms/application/ports/find-alarms.repository";
import { UpsertMaterializedAlarmRepository } from "src/alarms/application/ports/upsert-materialized-alarm.repository";

@Module({
  imports: [],
  providers: [
    {
      provide: CreateAlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
    {
      provide: FindAlarmsRepository,
      useExisting: InMemoryAlarmRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useExisting: InMemoryAlarmRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository,
  ],
})
export class InMemoryAlarmPersistenceModule {}
