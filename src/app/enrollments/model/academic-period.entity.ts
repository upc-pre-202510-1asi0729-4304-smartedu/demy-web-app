/**
 * Academic period entity.
 */
export class AcademicPeriod {
  id: number;
  periodName: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;

  /**
   * Creates an AcademicPeriod instance.
   *
   * @param academicPeriod - Partial data to initialize the entity
   */
  constructor(academicPeriod: {
    id?: number;
    periodName?: string;
    startDate?: Date;
    endDate?: Date;
    isActive?: boolean;
  }) {
    this.id = academicPeriod.id || 0;
    this.periodName = academicPeriod.periodName || '';
    this.startDate = academicPeriod.startDate || new Date();
    this.endDate = academicPeriod.endDate || new Date();
    this.isActive = academicPeriod.isActive ?? true;
  }
}
