import { TestBed } from '@angular/core/testing';
import { HttpClientModule }    from '@angular/common/http';

import { AccountService } from './account.service';

describe('AccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: AccountService = TestBed.get(AccountService);
    expect(service).toBeTruthy();
  });
});
