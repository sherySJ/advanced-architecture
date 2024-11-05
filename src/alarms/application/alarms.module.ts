import { DynamicModule, Module, Type } from "@nestjs/common";
import { AlarmFactory } from "../domain/factories/alarm.factory";
import { AlarmsController } from "../presenters/http/alarms.controller";
import { AlarmsService } from "./alarms.service";
import { GetAlarmsQueryHandler } from "../queries/get-alarms.query-handler";
import { AlarmCreatedEventHandler } from "./event-handlers/alarm-created.event-handler";
import { CreateAlarmCommandHandler } from "./commands/create-alarm-command-handler";

@Module({
  controllers: [AlarmsController],
  providers: [
    AlarmsService,
    AlarmFactory,
    CreateAlarmCommandHandler,
    GetAlarmsQueryHandler,
    AlarmCreatedEventHandler,
  ],
})
export class AlarmsModule {
  static withInfrasturce(infrastructureModule: Type | DynamicModule) {
    return {
      module: AlarmsModule,
      imports: [infrastructureModule],
    };
  }
}
