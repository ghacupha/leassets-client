import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FixedAssetNbvModule } from 'app/bespoke/display-tables/fixed-asset-nbv/fixed-asset-nbv.module';
import { FixedAssetDepreciationModule } from 'app/bespoke/display-tables/fixed-asset-depreciation/fixed-asset-depreciation.module';
import { FixedAssetAcquisitionModule } from 'app/bespoke/display-tables/fixed-asset-acquisition/fixed-asset-acquisition.module';

const routes: Routes = [
  { path: 'fixed-asset-nbv', loadChildren: () => import('./fixed-asset-nbv/fixed-asset-nbv.module').then(m => m.FixedAssetNbvModule) },
  {
    path: 'fixed-asset-acquisition-display',
    loadChildren: () => import('./fixed-asset-acquisition/fixed-asset-acquisition.module').then(m => m.FixedAssetAcquisitionModule),
  },
  {
    path: 'fixed-asset-depreciation-display',
    loadChildren: () => import('./fixed-asset-depreciation/fixed-asset-depreciation.module').then(m => m.FixedAssetDepreciationModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule, FixedAssetNbvModule, FixedAssetDepreciationModule, FixedAssetAcquisitionModule],
})
export class DisplayTablesModule {}
