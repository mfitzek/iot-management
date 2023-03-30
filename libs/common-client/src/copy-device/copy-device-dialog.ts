import { Dialog } from 'quasar';
import axios from '@iot/services/http-axios';
import { DeviceData } from '@iot/device';

export function copyDeviceDialog(deviceId: string) {
  return new Promise<string | null>((resolve, reject) => {
    Dialog.create({
      title: 'Copy IoT Device',
      message: 'Enter new name for the IoT Device',
      prompt: {
        model: '',
        type: 'text',
      },
      cancel: true,
    })
      .onOk((name: string) => {
        resolve(postCopyDevice(deviceId, name));
      })
      .onDismiss(() => {
        resolve(null);
      })
      .onCancel(() => {
        resolve(null);
      });
  });
}

async function postCopyDevice(deviceId: string, name: string) {
  const response = await axios.post<DeviceData | null>(`/device/${deviceId}/copy`, { name: name });
  if (response.data) {
    return response.data.id;
  }
  return null;
}
