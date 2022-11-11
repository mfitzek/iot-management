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

    async subscribe(topic: string, onData: (topic: string, data: any) => void): Promise<boolean> {
        this.subscriptions.push({topic, onData });
        let ok = true;
        this.client.subscribe(topic, (err)=> {
            if(err) {
                console.log("Subscribe error", err);
                ok = false;
            }

        });
        return ok;
    }

    publish(topic: string, data: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    disconnect() {
        throw new Error('Method not implemented.');
    }

    private onMessage(topic, data: Buffer){
        const message = data.toString();
        this.subscriptions.filter(sub=>sub.topic===topic)
                          .forEach(sub=>sub.onData(topic, message));
    }
    
}