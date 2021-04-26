import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'about/leassets-client',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
  },
  {
    path: 'display',
    loadChildren: () => import('./display-tables/display-tables.module').then(m => m.DisplayTablesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BespokeRoutingModule {}
