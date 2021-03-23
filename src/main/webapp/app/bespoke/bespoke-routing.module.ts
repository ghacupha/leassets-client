import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'about/leassets-client', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BespokeRoutingModule {}
