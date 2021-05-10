import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BespokeRoutingModule } from './bespoke-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { DisplayTablesModule } from './display-tables/display-tables.module';
import { QuestionnaireModule } from './navigation-questionnaire/questionnaire.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, BespokeRoutingModule, DisplayTablesModule, QuestionnaireModule],
  exports: [BespokeRoutingModule, DisplayTablesModule, QuestionnaireModule],
})
export class BespokeModule {}
