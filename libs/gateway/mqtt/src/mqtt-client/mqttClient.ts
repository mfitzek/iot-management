import { IMqttClient, IMqttClientSettings } from '../interfaces/IMqttService';

import {connect, MqttClient} from "mqtt";


interface ISubscription {
    topic: string;
    onData: (topic: string, data: any) => void;
}

export class CustomMqttClient implements IMqttClient {

    private settings: IMqttClientSettings;
    private client: MqttClient;
    private subscriptions: ISubscription[] = [];

    constructor(settings: IMqttClientSettings){
        this.settings = settings;
        this.connectMqttServer();
    }

    async connectMqttServer(){
        this.client = connect(this.settings.server);
        this.client.on("message", (topic,data)=>this.onMessage(topic,data));
        this.client.on("error", (err)=>console.log(err));
    }

    subscribe(topic: string, onData: (topic: string, data: any) => void): boolean {
        if(this.client){
            this.subscriptions.push({topic, onData });
            this.client.subscribe(topic);
            // TODO: Remove subscribed topics if exists??
            return true;
        }
        return false;

    }

    publish(topic: string, data: string): boolean {
        if(this.client){
            this.client.publish(topic, data);
            return true;
        }
        return false;
    }
    disconnect() {
       this.client.end();
       this.subscriptions = [];
    }

    private onMessage(topic, data: Buffer){
        const message = data.toString();
        this.subscriptions.filter(sub=>sub.topic===topic)
                          .forEach(sub=>sub.onData(topic, message));
    }
    
}