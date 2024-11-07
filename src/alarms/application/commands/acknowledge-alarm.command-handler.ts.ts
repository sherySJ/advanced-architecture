import { ICommandHandler } from "@nestjs/cqrs";
import { AcknowledgeAlarmCommand } from "./acknowledge-alarm.command";
import { AggregateRehydrator } from "src/shared/application/aggregate-rehydrator";
import { Logger } from "@nestjs/common";
import { Alarm } from "src/alarms/domain/alarm";

export class AcknowledgeAlarmCommandHandler
  implements ICommandHandler<AcknowledgeAlarmCommand>
{
  private readonly logger = new Logger(AcknowledgeAlarmCommandHandler.name);
  constructor(public readonly aggregateRehydrator: AggregateRehydrator) {}

  async execute(command: AcknowledgeAlarmCommand) {
    this.logger.debug(
      `Processing "AcknowledgeAlarmCommand" command with id: ${JSON.stringify(command)}`,
    );

    const alarm = await this.aggregateRehydrator.rehydrate(
      command.alarmId,
      Alarm,
    );
    alarm.acknowledge();
    alarm.commit();
    return alarm;
  }
}
