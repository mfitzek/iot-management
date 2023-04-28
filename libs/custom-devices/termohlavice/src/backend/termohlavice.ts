import { CreateAttribute, Device, DeviceData, IProvidedServices } from '@iot/device';

export class Termohlavice extends Device {
  private teplota = 0;
  private otevreniVentilu = 0;

  constructor(data: DeviceData, providers: IProvidedServices) {
    super(data, providers);
    this.setupMqtt();
  }

  public override getData(): DeviceData {
    const data = super.getData();
    console.log('getData', this.teplota);
    return {
      ...data,
      state: {
        otevreniVentilu: this.otevreniVentilu,
        teplota: this.teplota,
      },
    };
  }

  public override onCreate(): void {
    const teplota: CreateAttribute = {
      name: 'teplota',
      type: 'number',
    };
    const otevreniVentilu: CreateAttribute = {
      name: 'otevreniVentilu',
      type: 'number',
    };

    this.createAttributes([teplota, otevreniVentilu]).then(() => {
      this.setupMqtt();
    });
  }

  private setupMqtt(): void {
    const teplota = this.getAttributeByName('teplota');
    const otevreniVentilu = this.getAttributeByName('otevreniVentilu');

    if (!teplota || !otevreniVentilu) {
      return;
    }
    const client = this.providers.mqtt_service.createClient({
      server: 'mqtt://192.168.1.100:1883',
    });

    client.subscribe('termohlavice/teplota', (topic, data) => {
      this.teplota = Number(data);
      this.providers.telemetry_service.saveTelemetry({
        attribute_id: teplota.id,
        value: String(this.teplota),
        createdAt: new Date(),
      });
    });
    client.subscribe('termohlavice/ventil', (topic, data) => {
      this.otevreniVentilu = Number(data);
      this.providers.telemetry_service.saveTelemetry({
        attribute_id: otevreniVentilu.id,
        value: String(this.otevreniVentilu),
        createdAt: new Date(),
      });
    });
  }
}
