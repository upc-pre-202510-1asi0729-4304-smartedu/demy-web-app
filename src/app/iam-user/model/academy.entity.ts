/**
 * Represents an academy or educational institution registered in the system.
 *
 * @summary
 * Contains identification, ownership, and organizational details of an academy,
 * including its name, RUC, associated user, and academic periods.
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
   * Used for legal and tax identification purposes.
   */
  ruc: string;

  /**
   * Constructs a new {@link Academy} instance using a partial data object.
   *
   * @param academy - Optional object containing academy data to initialize the instance.
   * If a property is missing, a default value is assigned.
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
