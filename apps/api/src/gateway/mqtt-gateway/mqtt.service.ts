import { Injectable } from '@nestjs/common';
import { IMqttService, IMqttClient, IMqttClientSettings } from '@iot/gateway/mqtt';
import { CustomMqttClient } from '@iot/gateway/mqtt';

@Injectable()
export class MqttService implements IMqttService {
  private clients: IMqttClient[] = [];

  createClient(settings: IMqttClientSettings): IMqttClient {
    const client = new CustomMqttClient(settings);
    this.clients.push(client);
    return client;
  }
  quitService() {
    this.clients.forEach((client) => client.disconnect());
    this.clients = [];
  }
}
