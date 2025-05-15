/**
 * Academic period entity.
 */
export class AcademicPeriod {
  id: string;
  name: string;
  academyId: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;

  /**
   * Creates an AcademicPeriod instance.
   *
   * @param academicPeriod - Partial data to initialize the entity
   */
  constructor(academicPeriod: {
    id?: string;
    name?: string;
    academyId?: string;
    startDate?: Date;
    endDate?: Date;
    isActive?: boolean;
  }) {
    this.id = academicPeriod.id || '';
    this.name = academicPeriod.name || '';
    this.academyId = academicPeriod.academyId || '';
    this.startDate = academicPeriod.startDate || new Date();
    this.endDate = academicPeriod.endDate || new Date();
    this.isActive = academicPeriod.isActive ?? true;
  }
}
