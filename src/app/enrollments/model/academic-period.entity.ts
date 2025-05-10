export class AcademicPeriod {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  constructor(id = '', name = '', startDate = new Date(), endDate = new Date()) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
