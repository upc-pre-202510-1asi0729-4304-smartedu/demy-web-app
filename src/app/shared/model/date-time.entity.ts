/**
 * Represents a point in time with validation and formatting capabilities in the Shared bounded context.
 */
export class DateTime {
  private readonly _date: Date;

  /**
   * Creates a new DateTime instance, defaulting to the current time if no value is provided.
   * @param value - The date value (optional, defaults to now).
   * @throws {Error} If the provided value is invalid or in the future relative to now.
   */
  constructor(value?: Date | string) {
    const now = new Date();
    if (!value) {
      this._date = now;
    } else {
      const parsedDate = new Date(value);
      if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date value provided");
      }
      this._date = parsedDate;
    }
  }

  /**
   * Gets the underlying Date object.
   * @public
   * @returns The Date instance.
   */
  public get value(): Date {
    return this._date;
  }

  /**
   * Formats the date as a human-readable string.
   * @public
   * @param locale - The locale for formatting (defaults to "en-US").
   * @param options - Optional Intl.DateTimeFormat options.
   * @returns The formatted date (e.g., "April 9, 2025").
   */
  public format(locale: string = "en-US", options?: Intl.DateTimeFormatOptions): string {
    const defaultOptions: Intl.DateTimeFormatOptions = options ?? {
      year: "numeric",
      month: "long",
      day: "numeric"
    };

    return this._date.toLocaleDateString(locale, defaultOptions);
  }

  /**
   * Converts the DateTime to a string representation.
   * @public
   * @returns The ISO string representation of the date.
   */
  public toString(): string {
    return this._date.toISOString();
  }
}
