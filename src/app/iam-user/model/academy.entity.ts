/**
 * Represents an academy or educational institution registered in the system.
 * Contains identification, ownership, and organizational details.
 */
export class Academy {
  /**
   * Unique identifier of the academy.
   */
  id: number;

  /**
   * ID of the user who created or owns the academy.
   */
  userId: string;

  /**
   * List of academic period IDs associated with the academy.
   */
  periods: string[];

  /**
   * Official name of the academy.
   */
  academy_name: string;

  /**
   * RUC (Registro Único de Contribuyentes) number of the academy.
   * Used for legal and tax identification.
   */
  ruc: string;

  /**
   * Creates a new {@link Academy} instance from a partial object.
   *
   * @param academy - Optional object containing academy data.
   */
  constructor(academy: {
    id?: number,
    userId?: string,
    periods?: string[],
    academy_name?: string,
    ruc?: string
  } = {}) {
    this.id = academy.id || 0;
    this.userId = academy.userId || '';
    this.periods = academy.periods || [];
    this.academy_name = academy.academy_name || '';
    this.ruc = academy.ruc || '';
  }
}
