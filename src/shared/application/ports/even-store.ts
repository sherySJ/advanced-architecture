import { SerializableEvent } from "src/shared/domain/interfaces/serializable-events";

export abstract class EventStore {
  abstract persist(
    eventOrEvents: SerializableEvent | SerializableEvent[],
  ): Promise<void>;
  abstract getEventsByStreamId(streamId: string): Promise<SerializableEvent[]>;
}
