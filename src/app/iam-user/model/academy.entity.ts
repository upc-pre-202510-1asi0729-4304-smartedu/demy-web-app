
export class Academy {
  id: number;
  userId: string;
  periods: string[];
  academy_name: string;
  ruc: string;

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
