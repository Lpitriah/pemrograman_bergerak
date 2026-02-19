import { TestBed } from '@angular/core/testing';

import { RandomUser } from './random-user';

describe('RandomUser', () => {
  let service: RandomUser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomUser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
