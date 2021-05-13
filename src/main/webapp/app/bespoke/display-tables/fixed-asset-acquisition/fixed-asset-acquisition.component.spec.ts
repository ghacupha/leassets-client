import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetAcquisitionComponent } from './fixed-asset-acquisition.component';

describe('FixedAssetAcquisitionComponent', () => {
  let component: FixedAssetAcquisitionComponent;
  let fixture: ComponentFixture<FixedAssetAcquisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FixedAssetAcquisitionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetAcquisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
