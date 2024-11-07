import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UpsertMaterializedAlarmRepository } from "src/alarms/application/ports/upsert-materialized-alarm.repository";
import { AlarmReadModel } from "src/alarms/domain/read-models/alarm.read-model";
import { MaterializedAlarmView } from "../schema/materialized-alarm-view.schema";
import { Model } from "mongoose";

@Injectable()
export class OrmUpsertMaterializedAlarmRepository
  implements UpsertMaterializedAlarmRepository
{
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
  ) {}

  async upsert(
    alarm: Pick<AlarmReadModel, "id"> & Partial<AlarmReadModel>,
  ): Promise<void> {
    await this.alarmModel.findOneAndUpdate({ id: alarm.id }, alarm, {
      upsert: true,
    });
  }
}
