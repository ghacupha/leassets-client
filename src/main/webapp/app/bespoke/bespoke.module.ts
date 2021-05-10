import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BespokeRoutingModule } from './bespoke-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { DisplayTablesModule } from './display-tables/display-tables.module';
import { QuestionnaireModule } from './navigation-questionnaire/questionnaire.module';
import { BespokeNavigationModule } from './bespoke-nagivation/bespoke-navigation.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, BespokeRoutingModule, DisplayTablesModule, QuestionnaireModule, BespokeNavigationModule],
  exports: [BespokeRoutingModule, DisplayTablesModule, QuestionnaireModule, BespokeNavigationModule],
})
export class BespokeModule {}
