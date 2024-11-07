import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AlarmCreatedEvent } from "../../domain/events/alarm-created.event";
import { Logger } from "@nestjs/common";
import { UpsertMaterializedAlarmRepository } from "../ports/upsert-materialized-alarm.repository";
import { SerializedEventPayload } from "src/shared/domain/interfaces/serializable-events";

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler
  implements IEventHandler<SerializedEventPayload<AlarmCreatedEvent>>
{
  private readonly logger = new Logger(AlarmCreatedEventHandler.name);

  constructor(
    private readonly upsertMaterializedAlarmRepositry: UpsertMaterializedAlarmRepository,
  ) {}

  async handle(event: SerializedEventPayload<AlarmCreatedEvent>) {
    this.logger.log(`Alarm created: ${JSON.stringify(event)}`);

    await this.upsertMaterializedAlarmRepositry.upsert({
      id: event.alarm.id,
      name: event.alarm.name,
      severity: event.alarm.severity,
      triggeredAt: new Date(event.alarm.triggeredAt),
      isAcknowledged: event.alarm.isAcknowledged,
      items: event.alarm.items,
    });
  }
}
