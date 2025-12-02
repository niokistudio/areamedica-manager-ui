/**
 * Error thrown when user cancels a confirmation dialog
 */
export class ConfirmationError extends Error {
  constructor(message = "User cancelled the confirmation dialog") {
    super(message)
    this.name = "ConfirmationError"

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConfirmationError)
    }
  }
}
