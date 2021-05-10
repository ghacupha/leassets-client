import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FixedAssetNbvComponent } from './fixed-asset-nbv.component';
import { DataTablesModule as DtTablesModule } from 'angular-datatables';

const routes: Routes = [{ path: '', component: FixedAssetNbvComponent }];

@NgModule({
  declarations: [FixedAssetNbvComponent],
  imports: [CommonModule, RouterModule.forChild(routes), DtTablesModule],
  exports: [FixedAssetNbvComponent],
})
export class FixedAssetNbvModule {}
