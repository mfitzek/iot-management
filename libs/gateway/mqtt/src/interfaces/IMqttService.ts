export interface IMqttClientSettings {
    server: string;
    port?: number;
    username?: string;
    password?: string;
}

export interface IMqttService {
    createClient(settings: IMqttClientSettings) : IMqttClient
    quitService()
}

export interface IMqttClient {
    subscribe(topic: string, onData: (topic, data) => void): Promise<boolean>;
    publish(topic: string, data: string): Promise<boolean>;
    disconnect()
}