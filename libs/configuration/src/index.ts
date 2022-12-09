import { Injectable } from '@nestjs/common';
import { Settings } from './dataObjects';

@Injectable()
export class Configuration {
  private settings?: Settings;

  constructor() {}
}
