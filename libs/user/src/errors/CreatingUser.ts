export default class CreatingUserError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CreatingUserError.prototype);
  }
}

export class UsernameAlreadyExists extends CreatingUserError {
  constructor(username?: string) {
    super(`Username ${username} already exists`);
    Object.setPrototypeOf(this, UsernameAlreadyExists.prototype);
  }
}

export class EmaillreadyExists extends CreatingUserError {
  constructor(email?: string) {
    super(`Email ${email} already exists`);
    Object.setPrototypeOf(this, EmaillreadyExists.prototype);
  }
}
