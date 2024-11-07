import { ChangeStream, ChangeStreamInsertDocument } from "mongodb";
import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Document } from "mongoose";
import { EventBus } from "@nestjs/cqrs";
import { EVENT_STORE_CONNECTION } from "src/core/core.constants";
import { Event, EventDocument } from "./event-store/schemas/event.schema";
import { EventDeserializer } from "./event-store/deserializers/event.deserializer";

@Injectable()
export class EventsBridge
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private changeStream: ChangeStream<
    Document,
    ChangeStreamInsertDocument<EventDocument>
  >;

  constructor(
    @InjectModel(Event.name, EVENT_STORE_CONNECTION)
    private readonly eventStore: Model<Event>,
    private readonly eventBus: EventBus,
    private readonly eventDeserializer: EventDeserializer,
  ) {}

  onApplicationBootstrap() {
    this.changeStream = this.eventStore
      .watch()
      .on("change", (change: ChangeStreamInsertDocument<EventDocument>) => {
        if (change.operationType === "insert") {
          this.handleEventStoreChange(change);
        }
      });
  }

  onApplicationShutdown() {
    return this.changeStream.close();
  }

  handleEventStoreChange(change: ChangeStreamInsertDocument<EventDocument>) {
    const insertedEvent = change.fullDocument;

    const eventInstance = this.eventDeserializer.deserialize(insertedEvent);
    this.eventBus.subject$.next(eventInstance.data);
  }
}
