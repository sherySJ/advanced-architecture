export class CreateAlarmDto {
  name: string;
  severity: string;
  triggeredAt: Date;
  isAcknowledged: boolean;
  items: Array<{
    id: string;
    name: string;
    type: string;
  }>;
}
