import { getDeviceMqttSettings } from '../common/mqtt';
import { getHttpSettings, setHttpAccessToken, setHttpGatewayActive } from '../common/HttpSettings';
import {
  CustomRequest,
  CustomRequestMethod,
  CustomRouteResponse,
  Device,
  DeviceData,
  DeviceStatusInfo,
  IAttribute,
  IProvidedServices,
  UpdateDevice,
} from '@iot/device';
import { IMqttClient, IMqttClientSettings } from '@iot/gateway/mqtt';
import { Logger } from '@iot/logger';
import { ITelemetry } from '@iot/telemetry';
import { randomUUID } from 'crypto';

export class BasicDevice extends Device {
  mqtt_client?: IMqttClient;

  constructor(data: DeviceData, providers: IProvidedServices) {
    super(data, providers);
    this.connectToMqtt();
    this.setupHttpGateway();
  }

  override async handleCustomRoute(request: CustomRequest): Promise<CustomRouteResponse> {
    function generateAccessToken() {
      return randomUUID();
    }

    const { path, method } = request;
    if (method === CustomRequestMethod.POST && path === 'refresh-http-token') {
      const token = generateAccessToken();
      const updateSettings = setHttpAccessToken(this.getData(), token);
      await this.setKeyValue(updateSettings.key, updateSettings.value);
      this.setupHttpGateway();
      return this.getData();
    }
    if (method === CustomRequestMethod.POST && path === 'set-http-active') {
      if (request.body && typeof request.body === 'object' && 'active' in request.body) {
        const converted = request.body as { active: boolean };
        const active = Boolean(converted.active);
        const updateSettings = setHttpGatewayActive(this.getData(), active);
        await this.setKeyValue(updateSettings.key, updateSettings.value);
        this.setupHttpGateway();
        return this.getData();
      }
      return 'Missing active boolen in body';
    }
  }

  override async update(data: UpdateDevice) {
    const updated = await super.update(data);
    this.connectToMqtt();
    return updated;
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
      status: this.getStatus(telemetry),
      lastData,
    };
  }
  private getStatus(telemetry: ITelemetry[]): string {
    if (!this.mqtt_client) return 'offline';
    if (telemetry.length === 0) {
      return 'warning';
    }
    const last = telemetry[telemetry.length - 1];
    const elapsedTime = Date.now() - last.createdAt.getTime();
    const hour = 1000 * 60 * 60;
    return elapsedTime > hour ? 'warning' : 'online';
  }

  private connectToMqtt() {
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

  private subscribeMqtt() {
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
      Logger.instance.info(
        `Device (${this.getId()}) incoming telemetry ${attribute.name}: ${data} `
      );
      const telemety: ITelemetry = {
        attribute_id: attribute.id ?? '',
        value: data,
        createdAt: new Date(),
      };
      this.providers.telemetry_service.saveTelemetry(telemety);
    }
  }
  private getUserMqttSettings() {
    const data = this.getData();
    return getDeviceMqttSettings(data);
  }

  private setupHttpGateway() {
    const httpSettings = getHttpSettings(this.getData());
    if (!httpSettings || !httpSettings.active) {
      this.providers.http_service.unregisterDevice(this.getId());
      return;
    }

    this.providers.http_service.registerDevice(this.getId(), {
      accessToken: httpSettings.accessToken,
      onTelemetryHandler: (telemetryData) => {
        const attribute = this.attributes.find((attr) => attr.name === telemetryData.attributeName);
        if (!attribute) return;

        this.providers.telemetry_service.saveTelemetry({
          attribute_id: attribute.id || 'wtf',
          value: telemetryData.value,
          createdAt: new Date(),
        });
      },
    });
  }
}
