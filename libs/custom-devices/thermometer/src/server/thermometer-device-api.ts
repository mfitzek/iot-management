import { Device, DeviceData, DeviceStatusInfo, IProvidedServices } from '@iot/device';
import { IMqttClient } from '@iot/gateway/mqtt';

export class ThermometerDevice extends Device {
  private mqtt_client?: IMqttClient;

  constructor(data: DeviceData, providers: IProvidedServices) {
    super(data, providers);
  }

  public override getShortInfo(): DeviceStatusInfo {
    const part = super.getShortInfo();
    return {
      ...part,
      status: this.mqtt_client ? 'online' : 'ofline',
    };
  }

  private setupMqttGateway() {
    //this.providers.mqtt_service.createClient()
  }
}
