import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedAssetAcquisitionComponent } from './fixed-asset-acquisition.component';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule as DtTablesModule } from 'angular-datatables/src/angular-datatables.module';

const routes: Routes = [{ path: '', component: FixedAssetAcquisitionComponent }];

@NgModule({
  declarations: [FixedAssetAcquisitionComponent],
  imports: [CommonModule, RouterModule.forChild(routes), DtTablesModule],
  exports: [FixedAssetAcquisitionComponent],
})
export class FixedAssetAcquisitionModule {}
