export interface StreamLoggerInterface {
  log(...args: any[]): void
  error(...args: any[]): void
  end(): void
}
