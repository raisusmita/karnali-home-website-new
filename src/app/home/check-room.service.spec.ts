import { TestBed } from '@angular/core/testing';

import { CheckRoomService } from './check-room.service';

describe('CheckRoomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckRoomService = TestBed.get(CheckRoomService);
    expect(service).toBeTruthy();
  });
});
