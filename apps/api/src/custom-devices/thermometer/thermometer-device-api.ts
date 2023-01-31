import {
  CreateAttribute,
  Device,
  DeviceData,
  DeviceStatusInfo,
  IProvidedServices,
  UpdateDevice,
} from '@iot/device';
import { IMqttClient } from '@iot/gateway/mqtt';
import { MQTT_KEY } from '@iot/custom-devices/thermometer';

export class ThermometerDevice extends Device {
  private mqtt_client?: IMqttClient;

  constructor(data: DeviceData, providers: IProvidedServices) {
    super(data, providers);
    this.setupMqttGateway();
  }

  public override update(data: UpdateDevice): Promise<DeviceData> {
    const update = super.update(data);
    this.setupMqttGateway();
    return update;
  }

  public override onCreate() {
    console.log('On create !');
    const temperature: CreateAttribute = {
      name: 'temperature',
      type: 'number',
    };
    const humidity: CreateAttribute = {
      name: 'humidity',
      type: 'number',
    };

    this.update({
      id: this.getId(),
      name: this.name,
      attributes: {
        create: [temperature, humidity],
        update: [],
        remove: [],
      },
    }).then(() => {
      this.setupMqttGateway();
    });
  }

  public override async getShortInfo(): Promise<DeviceStatusInfo> {
    const part = await super.getShortInfo();

    const ids = this.getData().attributes.map((attr) => attr.id);

    const telemetry = await this.providers.telemetry_service.getTelemetry({
      attribute_ids: ids,
    });

    let lastData: Date | undefined = undefined;
    if (telemetry.length) {
      const last = telemetry[telemetry.length - 1];
      lastData = last.createdAt;
    }

    return {
      ...part,
      status: this.mqtt_client ? 'online' : 'ofline',
      lastData,
    };
  }

  private setupMqttGateway() {
    const data = this.getData();
    const temperature = data.attributes.find((a) => a.name === 'temperature');
    const humidity = data.attributes.find((a) => a.name === 'humidity');
    if (!humidity || !temperature) return;

    const connectionString = data.keyValues.find((kv) => kv.key === MQTT_KEY)?.value;
    if (!connectionString || connectionString.length == 0) return;

    this.mqtt_client?.disconnect();
    this.mqtt_client = this.providers.mqtt_service.createClient({
      server: connectionString,
    });

    this.mqtt_client.subscribe('esp/temp', (_, temp) => {
      this.providers.telemetry_service.saveTelemetry({
        attribute_id: temperature.id,
        value: temp,
        createdAt: new Date(),
      });
    });

    this.mqtt_client.subscribe('esp/hum', (_, hum) => {
      this.providers.telemetry_service.saveTelemetry({
        attribute_id: humidity.id,
        value: hum,
        createdAt: new Date(),
      });
    });
  }
}
