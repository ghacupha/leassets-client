import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BespokeNavigationModule {}
