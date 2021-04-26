import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BespokeRoutingModule } from './bespoke-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { DisplayTablesModule } from './display-tables/display-tables.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, BespokeRoutingModule, DisplayTablesModule],
  exports: [BespokeRoutingModule, DisplayTablesModule],
})
export class BespokeModule {}
