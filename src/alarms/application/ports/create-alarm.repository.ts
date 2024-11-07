import { Alarm } from "src/alarms/domain/alarm";

export abstract class CreateAlarmRepository {
  // abstract findAll(): Promise<Alarm[]>;
  abstract save(alarm: Alarm): Promise<Alarm>;
}
