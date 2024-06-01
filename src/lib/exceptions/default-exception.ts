export class DefaultError extends Error {
  constructor(message = 'Something went wrong!') {
    super(message);
    this.name = 'DefaultException';
  }
}
