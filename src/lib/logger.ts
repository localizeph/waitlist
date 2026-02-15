/**
 * Structured error logger for API, library, and processing interactions
 */

export interface LogContext {
  [key: string]: unknown;
}

/**
 * Log levels
 */
export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

/**
 * Structured logger for consistent error logging across the application
 */
class Logger {
  private static instance: Logger;
  private isDev: boolean;

  private constructor() {
    this.isDev = process.env.NODE_ENV === 'development';
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Format log entry with timestamp and context
   */
  private formatLog(
    level: LogLevel,
    source: string,
    message: string,
    error?: Error,
    context?: LogContext
  ): string {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      source,
      message,
      error: error
        ? {
            name: error.name,
            message: error.message,
            stack: this.isDev ? error.stack : undefined,
          }
        : undefined,
      context,
    };
    return JSON.stringify(logEntry);
  }

  /**
   * Log error with full context
   */
  error(source: string, message: string, error?: Error, context?: LogContext): void {
    const formatted = this.formatLog('error', source, message, error, context);
    console.error(formatted);
  }

  /**
   * Log warning
   */
  warn(source: string, message: string, context?: LogContext): void {
    const formatted = this.formatLog('warn', source, message, undefined, context);
    console.warn(formatted);
  }

  /**
   * Log info
   */
  info(source: string, message: string, context?: LogContext): void {
    const formatted = this.formatLog('info', source, message, undefined, context);
    console.log(formatted);
  }

  /**
   * Log debug (only in development)
   */
  debug(source: string, message: string, context?: LogContext): void {
    if (this.isDev) {
      const formatted = this.formatLog('debug', source, message, undefined, context);
      console.log(formatted);
    }
  }
}

export const logger = Logger.getInstance();

/**
 * Helper to safely extract error message from unknown error type
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Unknown error occurred';
}

/**
 * Helper to safely extract error with stack trace
 */
export function getErrorWithStack(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }
  return new Error(getErrorMessage(error));
}
