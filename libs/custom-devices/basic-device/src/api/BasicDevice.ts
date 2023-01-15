import { IProvidedServices } from '@iot/device';
import { Device, IAttribute, DeviceData } from '@iot/device';
import { IMqttClient, IMqttClientSettings } from '@iot/gateway/mqtt';
import { ITelemetry } from '@iot/telemetry';
import { getDeviceMqttSettings } from '../common/mqtt/mqtt';

export class APIBasicDevice extends Device {
  providers: IProvidedServices;
  mqtt_client?: IMqttClient;

  constructor(data: DeviceData, providers: IProvidedServices) {
    super(data, providers);
    this.providers = providers;
    this.connectToMqtt();
  }

  private getUserMqttSettings() {
    const data = this.getData();
    return getDeviceMqttSettings(data);
  }

  connectToMqtt() {
    if (this.mqtt_client) {
      this.mqtt_client.disconnect();
    }
    const mqttUserSettings = this.getUserMqttSettings();
    if (mqttUserSettings?.active) {
      const settings: IMqttClientSettings = {
        server: mqttUserSettings.url,
        password: mqttUserSettings.password.length > 0 ? mqttUserSettings.username : undefined,
        username: mqttUserSettings.username.length > 0 ? mqttUserSettings.username : undefined,
      };
      this.mqtt_client = this.providers.mqtt_service.createClient(settings);
      this.subscribeMqtt();
    }
  }

  subscribeMqtt() {
    const mapping = this.getUserMqttSettings()?.attribute_mapping ?? [];
    mapping.forEach((map) => {
      const attribute = this.attributes.find((attr) => attr.id === map.attribute_id);
      this.mqtt_client?.subscribe(map.topic, (topic, data) => {
        this.saveTelemetry(attribute, data);
      });
    });
  }

  private saveTelemetry(attribute: IAttribute | undefined, data: string) {
    if (attribute) {
      const telemety: ITelemetry = {
        attribute_id: attribute.id ?? '',
        value: data,
        createdAt: new Date(),
      };
      this.providers.telemetry_service.saveTelemetry(telemety);
    }
  }

  async update(data: DeviceData) {
    const updated = await super.update(data);
    this.connectToMqtt();
    return updated;
  }
}
