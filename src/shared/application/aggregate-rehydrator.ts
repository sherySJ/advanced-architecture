import { Injectable, Type } from "@nestjs/common";
import { EventStore } from "./ports/even-store";
import { EventPublisher } from "@nestjs/cqrs";
import { VersionedAggregateRoot } from "../domain/value-objects/aggregate-root";

@Injectable()
export class AggregateRehydrator {
  constructor(
    private readonly eventStore: EventStore,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async rehydrate<T extends VersionedAggregateRoot>(
    aggregateId: string,
    AggregateCls: Type<T>,
  ): Promise<T> {
    const events = await this.eventStore.getEventsByStreamId(aggregateId);

    const AggregateClsWithDispatcher =
      this.eventPublisher.mergeClassContext(AggregateCls);

    const aggregate = new AggregateClsWithDispatcher(aggregateId);

    aggregate.loadFromHistory(events);
    return aggregate;
  }
}
