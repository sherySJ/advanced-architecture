import { Injectable, Type } from "@nestjs/common";
import { SerializableEvent } from "src/shared/domain/interfaces/serializable-events";
import { EventClsRegistry } from "../event-cls.registry";

@Injectable()
export class EventDeserializer {
  deserialize<T>(event: SerializableEvent): SerializableEvent<T> {
    const eventCls = this.getEventClassbyType(event.type);
    return {
      ...event,
      data: this.instantiateSerializedEvent(eventCls, event.data),
    };
  }

  getEventClassbyType(type: string) {
    return EventClsRegistry.get(type);
  }

  instantiateSerializedEvent<T extends Type>(
    eventCls: T,
    data: Record<string, any>,
  ) {
    return Object.assign(Object.create(eventCls.prototype), data);
  }
}
