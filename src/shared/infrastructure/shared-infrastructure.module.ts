import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EVENT_STORE_CONNECTION } from "src/core/core.constants";
import { EventSchema } from "./event-store/schemas/event.schema";
import { EventSerializer } from "./event-store/serilizers/event.serializer";
import { EventStorePublisher } from "./event-store/publishers/event-store.publisher";
import { MongoEventStore } from "./event-store/mongo-event.store";
import { EventsBridge } from "./events-bridge";
import { EventDeserializer } from "./event-store/deserializers/event.deserializer";
import { EventStore } from "../application/ports/even-store";

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Event.name,
          schema: EventSchema,
        },
      ],
      EVENT_STORE_CONNECTION,
    ),
  ],
  providers: [
    EventSerializer,
    EventStorePublisher,
    MongoEventStore,
    EventsBridge,
    EventDeserializer,
    {
      provide: EventStore,
      useExisting: MongoEventStore,
    },
  ],
  exports: [EventStore],
})
export class SharedInfrastructureModule {}
