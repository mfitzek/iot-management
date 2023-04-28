import { DeviceData, DeviceState } from "@iot/device";

export type TermohlaviceState = DeviceState & {
    otevreniVentilu: number;
    teplota: number;
}
export interface TermohlaviceData extends DeviceData {
    state: TermohlaviceState;
}