type ValidationErrorDetails = {
  [key: string]: {
    message: string;
    rule: string;
  }
};

export class ValidationError extends Error {
  details: string[];
  constructor(details: ValidationErrorDetails) {
    super('Validation Failed!');
    this.name = 'ValidationError';
    this.details = Object.values(details).map(({ message }) => message);
  }
}