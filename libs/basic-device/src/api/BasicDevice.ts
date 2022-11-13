import { IProvidedServices } from "@iot/custom-device";
import { Device, IDeviceData } from "@iot/device";
import { IMqttClient, IMqttClientSettings } from "@iot/gateway/mqtt";




export class APIBasicDevice extends Device {

    providers: IProvidedServices;

    mqtt_client?: IMqttClient;

    constructor(data: IDeviceData, providers: IProvidedServices){
        super(providers.device_service, data);
        this.providers = providers;
        //this.connectToMqtt();
    }



    connectToMqtt(){
        const settings: IMqttClientSettings = {
            server: "mqtt://localhost:1883"
        }
        this.mqtt_client = this.providers.mqtt_service.createClient(settings);
        this.subscribeMqtt();
    }

    subscribeMqtt(){
        this.mqtt_client?.subscribe("test", (topic, data)=>{
            console.log(`${this.id} => MQTT ${topic}: ${data}`);
        });
    }






}