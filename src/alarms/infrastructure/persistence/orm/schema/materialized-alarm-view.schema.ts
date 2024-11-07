import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class MaterializedAlarmView {
  @Prop({ unique: true, index: true })
  id: string;

  @Prop()
  name: string;

  @Prop(
    raw([
      {
        id: String,
        name: String,
        type: {
          type: String,
        },
      },
    ]),
  )
  items: Array<{
    id: string;
    name: string;
    type: string;
  }>;
}

export const MaterializedAlarmViewSchema = SchemaFactory.createForClass(
  MaterializedAlarmView,
);
