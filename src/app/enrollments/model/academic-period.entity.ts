export class AcademicPeriod {
  id: string;
  name: string;
  academyId: string
  startDate: Date;
  endDate: Date;
  isActive: boolean;

  constructor(academicPeriod: {id?: string, name?: string, academyId?: string, startDate?: Date, endDate?: Date, isActive?: boolean}) {
    this.id = academicPeriod.id || '';
    this.name = academicPeriod.name || '';
    this.academyId = academicPeriod.academyId || '';
    this.startDate = academicPeriod.startDate || new Date();
    this.endDate = academicPeriod.endDate || new Date();
    this.isActive = academicPeriod.isActive || true;
  }
}
