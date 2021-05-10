import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { DisplayTablesComponent } from './display-tables/display-tables.component';

@NgModule({
  declarations: [DisplayTablesComponent],
  exports: [DisplayTablesComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BespokeNavigationModule {}
