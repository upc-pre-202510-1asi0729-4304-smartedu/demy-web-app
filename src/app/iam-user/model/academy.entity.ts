
export class Academy {
  id: number;
  userId: string;
  periods: string[];
  academyName: string;
  ruc: string;

  constructor(academy: {
    id?: number,
    userId?: string,
    periods?: string[],
    academyName?: string,
    ruc?: string
  } = {}) {
    this.id = academy.id || 0;
    this.userId = academy.userId || '';
    this.periods = academy.periods || [];
    this.academyName = academy.academyName || '';
    this.ruc = academy.ruc || '';
  }
}
