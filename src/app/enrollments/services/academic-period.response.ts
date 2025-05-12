export interface AcademicPeriodsResponse {
  academic_periods: AcademicPeriodResource[]
}


export interface AcademicPeriodResource {
  id: string;
  name: string;
  academy_id: string;
  start_date: string;
  end_date: string;
}

export interface AcademicPeriodSummaryResource {
  id: string;
  name: string;
}

export interface AcademicPeriodRegistrationResource {
  name: string;
  academy_id: string;
  start_date: string;
  end_date: string;
}
