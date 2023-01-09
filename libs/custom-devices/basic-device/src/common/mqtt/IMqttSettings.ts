export interface IMqttSettings {
  active: boolean;
  url: string;
  username: string;
  password: string;

  attribute_mapping: IMqttAttributeMap[];
}

export interface IMqttAttributeMap {
  attribute_id: string;
  topic: string;
}
