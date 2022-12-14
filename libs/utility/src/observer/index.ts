export interface Observer {
  onUpdate(): void;
}

export interface Observable {
  notify(): void;
  register(observer: Observer): void;
  unregister(observer: Observer): void;
}
