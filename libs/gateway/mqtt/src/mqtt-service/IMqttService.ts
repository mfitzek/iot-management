import { IMqttClient, IMqttClientSettings } from '../mqtt-client/mqttClient';

export interface IMqttService {
  createClient(settings: IMqttClientSettings): IMqttClient;
  quitService();
}
