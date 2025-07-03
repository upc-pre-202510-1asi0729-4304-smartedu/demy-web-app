import { TestBed } from '@angular/core/testing';

import { AttendanceStudentService } from './attendance-student.service';

describe('AttendanceStudentService', () => {
  let service: AttendanceStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
