import { Device, DeviceData, DeviceStatusInfo, IAttribute, IProvidedServices } from '@iot/device';
import { IMqttClient } from '@iot/gateway/mqtt';

export class ThermometerDevice extends Device {
  private mqtt_client?: IMqttClient;

  constructor(data: DeviceData, providers: IProvidedServices) {
    super(data, providers);
  }

  public override onCreate(): void {
    const temperature: IAttribute = {
      name: 'temperature',
      type: 'number',
    };
    const humidity: IAttribute = {
      name: 'temperature',
      type: 'number',
    };
  }

  public override getShortInfo(): DeviceStatusInfo {
    const part = super.getShortInfo();
    return {
      ...part,
      status: this.mqtt_client ? 'online' : 'ofline',
    };
  }

  private setupMqttGateway() {
    this.mqtt_client = this.providers.mqtt_service.createClient({
      server: 'mqtt://localhost:1883',
    });

    this.mqtt_client.subscribe('esp/temp', (_, temp) => {
      // this.providers.telemetry_service.saveTelemetry({
      // })
    });
  }
}
