import { Injectable } from "@nestjs/common";
import { CreateAlarmRepository } from "src/alarms/application/ports/create-alarm.repository";
import { Alarm } from "src/alarms/domain/alarm";
import { AlarmMapper } from "../mappers/alarm.mapper";
import { AlarmEntity } from "../entities/alarm.entity";
import { FindAlarmsRepository } from "src/alarms/application/ports/find-alarms.repository";
import { UpsertMaterializedAlarmRepository } from "src/alarms/application/ports/upsert-materialized-alarm.repository";
import { AlarmReadModel } from "src/alarms/domain/read-models/alarm.read-model";

@Injectable()
export class InMemoryAlarmRepository
  implements
    CreateAlarmRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository
{
  private readonly alarms = new Map<string, AlarmEntity>();
  private readonly materilziedAlarmViews = new Map<string, AlarmReadModel>();

  async findAll(): Promise<AlarmReadModel[]> {
    return Array.from(this.materilziedAlarmViews.values());
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    this.alarms.set(persistenceModel.id, persistenceModel);

    const newEntity = this.alarms.get(persistenceModel.id);
    return AlarmMapper.toDomain(newEntity);
  }

  async upsert(
    alarm: Pick<AlarmReadModel, "id"> & Partial<AlarmReadModel>,
  ): Promise<void> {
    if (this.materilziedAlarmViews.has(alarm.id)) {
      this.materilziedAlarmViews.set(alarm.id, {
        ...this.materilziedAlarmViews.get(alarm.id),
        ...alarm,
      });
      return;
    }
  }
}
