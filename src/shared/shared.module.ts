import { Module } from "@nestjs/common";
import { SharedInfrastructureModule } from "./infrastructure/shared-infrastructure.module";
import { AggregateRehydrator } from "./application/aggregate-rehydrator";

@Module({
  imports: [SharedInfrastructureModule],
  providers: [AggregateRehydrator],
  exports: [SharedInfrastructureModule, AggregateRehydrator],
})
export class SharedModule {}
