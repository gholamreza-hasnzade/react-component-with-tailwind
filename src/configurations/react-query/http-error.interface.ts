export interface Problem {
  title: string;
  status: number;
  detail?: string;
  errors?: Record<string, string[]>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BadRequestError extends Problem {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UnauthorizedError extends Problem {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ValidationError extends Problem {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NotFoundError extends Problem {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UnhandledException extends Problem {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NetworkError extends Problem {}

type ApiError =
  | BadRequestError
  | NetworkError
  | NotFoundError
  | UnhandledException
  | UnauthorizedError
  | ValidationError;

export type {
  BadRequestError,
  UnauthorizedError,
  ValidationError,
  NotFoundError,
  UnhandledException,
  NetworkError,
  ApiError,
};
