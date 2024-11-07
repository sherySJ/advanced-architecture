import { VersionedAggregateRoot } from "src/shared/domain/value-objects/aggregate-root";
import { AlarmItem } from "./alarm-item";
import { AlarmSeverity } from "./value-objects/alarm-severity";
import { AlarmAcknowledgedEvent } from "./events/alarm-acknowledged.event";
import { SerializedEventPayload } from "src/shared/domain/interfaces/serializable-events";
import { AlarmCreatedEvent } from "./events/alarm-created.event";

export class Alarm extends VersionedAggregateRoot {
  public name: string;
  public severity: AlarmSeverity;
  public triggeredAt: Date;
  public isAcknowledged = false;
  public items = new Array<AlarmItem>();

  constructor(public id: string) {
    super();
  }

  acknowledge() {
    this.apply(new AlarmAcknowledgedEvent(this.id));
  }

  addAlarmItem(item: AlarmItem) {
    this.items.push(item);
  }

  [`on${AlarmCreatedEvent.name}`](
    event: SerializedEventPayload<AlarmCreatedEvent>,
  ) {
    this.name = event.alarm.name;
    this.severity = new AlarmSeverity(event.alarm.severity);
    this.isAcknowledged = event.alarm.isAcknowledged;
    this.items = event.alarm.items.map(
      (item) => new AlarmItem(item.id, item.name, item.type),
    );
  }

  [`on${AlarmAcknowledgedEvent.name}`](
    event: SerializedEventPayload<AlarmAcknowledgedEvent>,
  ) {
    if (this.isAcknowledged) {
      throw new Error("Alarm has already been acknowledged");
    }
    this.isAcknowledged = true;
  }
}
