import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'fixed-asset-nbv', loadChildren: () => import('./fixed-asset-nbv/fixed-asset-nbv.module').then(m => m.FixedAssetNbvModule) },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayTablesModule {}
