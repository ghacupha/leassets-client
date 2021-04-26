import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetNbvComponent } from './fixed-asset-nbv.component';

describe('FixedAssetNbvComponent', () => {
  let component: FixedAssetNbvComponent;
  let fixture: ComponentFixture<FixedAssetNbvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FixedAssetNbvComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetNbvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
