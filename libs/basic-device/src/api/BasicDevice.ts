import { IProvidedServices } from "@iot/custom-device";
import { Device, IDeviceData } from "@iot/device";
import { IMqttClient, IMqttClientSettings } from "@iot/gateway/mqtt";
import { getDeviceMqttSettings } from "../common/mqtt/mqtt";




export class APIBasicDevice extends Device {

    providers: IProvidedServices;
    mqtt_client?: IMqttClient;

    constructor(data: IDeviceData, providers: IProvidedServices){
        super(providers.device_service, data);
        this.providers = providers;
        this.connectToMqtt();
    }

    private getUserMqttSettings(){
        const data = this.getData();
        return getDeviceMqttSettings(data);
    }

    connectToMqtt(){
        if(this.mqtt_client){
            this.mqtt_client.disconnect();
        }
        const mqttUserSettings = this.getUserMqttSettings();
        if(mqttUserSettings && mqttUserSettings.active){
            const settings: IMqttClientSettings = {
                server: mqttUserSettings.url,
                password: mqttUserSettings.password.length>0? mqttUserSettings.username:undefined,
                username: mqttUserSettings.username.length>0? mqttUserSettings.username:undefined,
            }
            this.mqtt_client = this.providers.mqtt_service.createClient(settings);
            this.subscribeMqtt();
        }
    }

    subscribeMqtt(){
        this.mqtt_client?.subscribe("test", (topic, data)=>{
            console.log(`${this.id} => MQTT ${topic}: ${data}`);
        });
    }

    async update(data: IDeviceData) {
        const updated = await super.update(data);
        this.connectToMqtt();
        return updated;
    }
}