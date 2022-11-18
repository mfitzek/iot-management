export interface IMqttClientSettings {
    server: string;
    username?: string;
    password?: string;
}

export interface IMqttService {
    createClient(settings: IMqttClientSettings) : IMqttClient
    quitService()
}

export interface IMqttClient {
    subscribe(topic: string, onData: (topic, data) => void): boolean;
    publish(topic: string, data: string): boolean;
    disconnect()
}