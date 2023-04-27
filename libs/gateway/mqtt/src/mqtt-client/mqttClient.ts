import { connect, MqttClient } from 'mqtt';

export interface IMqttClient {
  subscribe(topic: string, onData: (topic, data) => void): boolean;
  publish(topic: string, data: string): boolean;
  disconnect();
}
export interface IMqttClientSettings {
  server: string;
  username?: string;
  password?: string;
}

interface ISubscription {
  topic: string;
  onData: (topic: string, data: any) => void;
}

export class CustomMqttClient implements IMqttClient {
  private settings: IMqttClientSettings;
  private client: MqttClient;
  private subscriptions: ISubscription[] = [];
  private lastError: any;

  constructor(settings: IMqttClientSettings) {
    this.settings = settings;
    this.connectMqttServer();
  }

  async connectMqttServer() {
    try {
      this.client = connect(this.settings.server);
      this.client.on('message', (topic, data) => this.onMessage(topic, data));
      this.client.on('error', (err) => {
        this.lastError = err;
      });
    } catch (err) {
      this.lastError = err;
    }
  }

  subscribe(topic: string, onData: (topic: string, data: any) => void): boolean {
    if (this.client) {
      this.subscriptions.push({ topic, onData });
      this.client.subscribe(topic);
      return true;
    }
    return false;
  }

  publish(topic: string, data: string): boolean {
    if (this.client) {
      this.client.publish(topic, data);
      return true;
    }
    return false;
  }
  disconnect() {
    this.client.end();
    this.subscriptions = [];
  }

  private onMessage(topic, data: Buffer) {
    const message = data.toString();
    this.subscriptions
      .filter((sub) => sub.topic === topic)
      .forEach((sub) => sub.onData(topic, message));
  }
}
