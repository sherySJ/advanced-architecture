import { AlarmSeverity } from "src/alarms/domain/value-objects/alarm-severity";
import { AlarmEntity } from "../../orm/entities/alarm.entity";
import { Alarm } from "src/alarms/domain/alarm";

export class AlarmMapper {
  static toDomain(alarmEntity: AlarmEntity): Alarm {
    const alartmSeverity = new AlarmSeverity(
      alarmEntity.severity as "critical" | "low" | "medium" | "high",
    );
    const alarmModel = new Alarm(
      alarmEntity.id,
      alarmEntity.name,
      alartmSeverity,
    );
    return alarmModel;
  }

  static toPersistence(alarm: Alarm) {
    const entity = new AlarmEntity();
    entity.id = alarm.id;
    entity.name = alarm.name;
    entity.severity = alarm.severity.value;
    return entity;
  }
}
