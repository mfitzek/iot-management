import { IDevice } from '@iot/device';
import { IGateway } from '@iot/gateway';

export class HTTP_Gateway implements IGateway {
  registerDevice(device: IDevice): Promise<boolean> {}
}
