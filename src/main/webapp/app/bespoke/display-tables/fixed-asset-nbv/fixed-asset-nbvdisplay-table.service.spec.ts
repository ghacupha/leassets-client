import { TestBed } from '@angular/core/testing';

import { FixedAssetNBVDisplayTableService } from './fixed-asset-nbvdisplay-table.service';

describe('FixedAssetNBVDisplayTableService', () => {
  let service: FixedAssetNBVDisplayTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedAssetNBVDisplayTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
