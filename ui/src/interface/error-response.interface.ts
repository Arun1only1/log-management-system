interface ErrorMessage {
  message: string;
}
export interface IError extends Error {
  errors: ErrorMessage[];
}
