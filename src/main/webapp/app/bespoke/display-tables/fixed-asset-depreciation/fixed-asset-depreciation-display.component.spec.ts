import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetDepreciationDisplayComponent } from './fixed-asset-depreciation-display.component';

describe('FixedAssetDepreciationDisplayComponent', () => {
  let component: FixedAssetDepreciationDisplayComponent;
  let fixture: ComponentFixture<FixedAssetDepreciationDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FixedAssetDepreciationDisplayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetDepreciationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
