import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule as DtTablesModule } from 'angular-datatables/src/angular-datatables.module';
import { FixedAssetNbvComponent } from 'app/bespoke/display-tables/fixed-asset-nbv/fixed-asset-nbv.component';

const routes: Routes = [{ path: '', component: FixedAssetNbvComponent }];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), DtTablesModule],
})
export class FixedAssetDepreciationModule {}
