import { Module } from "@nestjs/common";
import { OrmAlartPersistenceModule } from "./persistence/orm/orm-persistence.module";
import { InMemoryAlarmPersistenceModule } from "./persistence/in-memory/in-memory-persistence.module";
import { SharedModule } from "src/shared/shared.module";

@Module({
  imports: [SharedModule],
  exports: [SharedModule],
})
export class AlarmInfrastructureModule {
  static use(driver: "orm" | "in-memory") {
    const persistenceModule =
      driver === "orm"
        ? OrmAlartPersistenceModule
        : InMemoryAlarmPersistenceModule;

    return {
      module: AlarmInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
