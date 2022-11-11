import { Injectable } from "@nestjs/common";
import { IMqttService, IMqttClient, IMqttClientSettings } from "../interfaces/IMqttService";
import { CustomMqttClient } from "../mqtt-client/mqttClient";


@Injectable()
export class MqttService implements IMqttService {

    private clients: IMqttClient[] = [];

    createClient(settings: IMqttClientSettings): IMqttClient {
        const client = new CustomMqttClient(settings);
        this.clients.push(client);
        return client;
    }
    quitService() {
        throw new Error("Method not implemented.");
    }

}