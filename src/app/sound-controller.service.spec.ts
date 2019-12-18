import { TestBed } from '@angular/core/testing';

import { SoundControllerService } from './sound-controller.service';

describe('SoundControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoundControllerService = TestBed.get(SoundControllerService);
    expect(service).toBeTruthy();
  });
});
