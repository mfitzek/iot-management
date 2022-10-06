export class CustomDeviceAlreadyExistsError extends Error {
  constructor(type: string) {
    super(`${type} already is defined`);
  }
}

export class CustomDeviceIsNotDefinedError extends Error {
  constructor(type: string) {
    super(`${type} is not defined`);
  }
}
