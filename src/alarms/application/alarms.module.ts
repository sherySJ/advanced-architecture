import { DynamicModule, Module, Type } from "@nestjs/common";
import { AlarmFactory } from "../domain/factories/alarm.factory";
import { AlarmsController } from "../presenters/http/alarms.controller";
import { AlarmsService } from "./alarms.service";
import { CreateAlarmCommandHandler } from "./commands/create-alarm-command";
import { GetAlarmsQueryHandler } from "../queries/get-alarms.query-handler";

@Module({
  controllers: [AlarmsController],
  providers: [
    AlarmsService,
    AlarmFactory,
    CreateAlarmCommandHandler,
    GetAlarmsQueryHandler,
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
