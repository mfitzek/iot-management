import { IDevice } from '@iot/device';

interface deviceRegistration {
  mqttClient: any;
  device: IDevice;
}

export class MQTT_Gateway {
  clients = [];

  registerDevice(device, cb) {}
}
