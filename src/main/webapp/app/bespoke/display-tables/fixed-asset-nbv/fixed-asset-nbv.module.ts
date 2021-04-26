import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FixedAssetNbvComponent } from './fixed-asset-nbv.component';

const routes: Routes = [{ path: '', component: FixedAssetNbvComponent }];

@NgModule({
  declarations: [FixedAssetNbvComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FixedAssetNbvModule {}
