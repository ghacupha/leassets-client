import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationQuestionnaireComponent } from './navigation-questionnaire.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

const routes: Routes = [{ path: '', component: NavigationQuestionnaireComponent }];

@NgModule({
  declarations: [NavigationQuestionnaireComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [NavigationQuestionnaireComponent, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class QuestionnaireModule {}
