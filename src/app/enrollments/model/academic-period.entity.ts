export class AcademicPeriod {
  id: string;
  name: string;
  academyId: string
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  constructor(id = '', name = '', academyId = '', startDate = new Date(), endDate = new Date(), isActive = true) {
    this.id = id;
    this.name = name;
    this.academyId = academyId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.isActive = isActive
  }
}
