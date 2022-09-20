export class CreatingUserError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CreatingUserError.prototype);
    message = 'CreatingUserError: ' + message;
  }
}

export class UsernameAlreadyExists extends CreatingUserError {
  constructor() {
    super(`Username already exists`);
    Object.setPrototypeOf(this, UsernameAlreadyExists.prototype);
  }
}

export class EmaillreadyExists extends CreatingUserError {
  constructor() {
    super(`Email already exists`);
    Object.setPrototypeOf(this, EmaillreadyExists.prototype);
  }
}
