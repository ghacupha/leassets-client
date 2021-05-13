import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule as DtTablesModule } from 'angular-datatables/src/angular-datatables.module';
import { FixedAssetDepreciationDisplayComponent } from './fixed-asset-depreciation-display.component';

const routes: Routes = [{ path: '', component: FixedAssetDepreciationDisplayComponent }];

@NgModule({
  declarations: [FixedAssetDepreciationDisplayComponent],
  imports: [CommonModule, RouterModule.forChild(routes), DtTablesModule],
  exports: [FixedAssetDepreciationDisplayComponent],
})
export class FixedAssetDepreciationModule {}
