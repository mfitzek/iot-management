export interface Observer {
  onUpdate(observable: Observer): void;
}

export interface Observable {
  notify(): void;
  register(observer: Observer): void;
  unregister(observer: Observer): void;
}
