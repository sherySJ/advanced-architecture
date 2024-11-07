import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { UpsertMaterializedAlarmRepository } from "../ports/upsert-materialized-alarm.repository";
import { SerializedEventPayload } from "src/shared/domain/interfaces/serializable-events";
import { AlarmAcknowledgedEvent } from "src/alarms/domain/events/alarm-acknowledged.event";

@EventsHandler(AlarmAcknowledgedEvent)
export class AlarmCreatedEventHandler
  implements IEventHandler<SerializedEventPayload<AlarmAcknowledgedEvent>>
{
  private readonly logger = new Logger(AlarmAcknowledgedEvent.name);

  constructor(
    private readonly upsertMaterializedAlarmRepositry: UpsertMaterializedAlarmRepository,
  ) {}

  async handle(event: SerializedEventPayload<AlarmAcknowledgedEvent>) {
    this.logger.log(`Alarm acknowledged eventt: ${JSON.stringify(event)}`);

    await this.upsertMaterializedAlarmRepositry.upsert({
      id: event.alarmId,
      isAcknowledged: true,
    });
  }
}
