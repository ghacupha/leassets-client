import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BespokeRoutingModule } from './bespoke-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, BespokeRoutingModule],
  exports: [BespokeRoutingModule],
})
export class BespokeModule {}
