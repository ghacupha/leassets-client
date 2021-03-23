import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'fixed-asset-acquisition',
        data: { pageTitle: 'FixedAssetAcquisitions' },
        loadChildren: () => import('./fixed-asset-acquisition/fixed-asset-acquisition.module').then(m => m.FixedAssetAcquisitionModule),
      },
      {
        path: 'fixed-asset-net-book-value',
        data: { pageTitle: 'FixedAssetNetBookValues' },
        loadChildren: () =>
          import('./fixed-asset-net-book-value/fixed-asset-net-book-value.module').then(m => m.FixedAssetNetBookValueModule),
      },
      {
        path: 'fixed-asset-depreciation',
        data: { pageTitle: 'FixedAssetDepreciations' },
        loadChildren: () => import('./fixed-asset-depreciation/fixed-asset-depreciation.module').then(m => m.FixedAssetDepreciationModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
