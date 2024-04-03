/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanActiveService } from './CanActive.service';

describe('Service: CanActive', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActiveService]
    });
  });

  it('should ...', inject([CanActiveService], (service: CanActiveService) => {
    expect(service).toBeTruthy();
  }));
});
