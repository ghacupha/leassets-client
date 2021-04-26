///
/// Granular Summaries - Granular data analysis system
/// Copyright © 2020 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Router } from '@angular/router';
import {
  INavigationQuestionnaire,
  NavigationQuestionnaire,
} from 'app/bespoke/bespoke-navigation/navigation-questionnaire/navigation-questionnaire.model';
import { RouteStateService } from 'app/bespoke/route-state.service';
import { NGXLogger } from 'ngx-logger';
import { Moment } from 'moment';
import { NavigationQuestionnaireModalService } from 'app/bespoke/bespoke-navigation/navigation-questionnaire/navigation-questionnaire-modal.service';

@Component({
  selector: 'jhi-navigation-questionnaire',
  templateUrl: './navigation-questionnaire.component.html',
  styleUrls: ['./navigation-questionnaire.component.scss'],
})
export class NavigationQuestionnaireComponent implements OnInit {
  isBusy = false;
  reportingPeriodDP: any;
  submissionNavigationQuestionnaire?: INavigationQuestionnaire | undefined;
  navigationPath?: string;

  editForm = this.fb.group({
    reportingPeriod: [null, [Validators.required]],
  });

  constructor(
    protected eventManager: JhiEventManager,
    protected alertService: JhiAlertService,
    protected router: Router,
    protected log: NGXLogger,
    private navigationQuestionnaireModelService: NavigationQuestionnaireModalService,
    protected routeStateService: RouteStateService<INavigationQuestionnaire>,
    protected navigationPathService: RouteStateService<string>,
    private fb: FormBuilder
  ) {
    this.navigationPath = navigationPathService.data;
    this.navigationPathService.reset();
  }

  ngOnInit(): void {
    this.log.debug(`Incoming navigation request to the path ${this.navigationPath}`);
  }

  updateForm(navigationQuestions: INavigationQuestionnaire): void {
    this.editForm.patchValue({
      reportingPeriod: navigationQuestions.reportingPeriod,
    });
  }

  previousState(): void {
    this.navigationQuestionnaireModelService.close();
    window.history.back();
  }

  /**
   * Navigation to the relevant report with the details having been passed via service
   */
  async submit(): Promise<void> {
    this.isBusy = true;
    this.submissionNavigationQuestionnaire = this.createFromForm();

    // Save data in the route state service
    this.routeStateService.data = this.submissionNavigationQuestionnaire;

    this.log.debug(
      `Navigation to the route: ${this.navigationPath} in the month of: ${this.submissionNavigationQuestionnaire.reportingPeriod}`
    );

    // TODO Call router and navigate to relevant component
    const success: boolean = await this.router.navigate([`${this.navigationPath}`]);

    if (success) {
      this.onSubmitSuccess();
    } else {
      this.onSubmitError();
    }
  }

  private createFromForm(): INavigationQuestionnaire {
    return {
      ...new NavigationQuestionnaire(),
      reportingPeriod: this.editForm.get(['reportingPeriod'])!.value,
    };
  }

  protected onSubmitSuccess(): void {
    this.isBusy = false;
  }

  protected onSubmitError(): void {
    this.isBusy = false;
    const reportingMonth: Moment | undefined = this.submissionNavigationQuestionnaire?.reportingPeriod;
    this.alertService.error(`Navigation to the requested report on the month ${reportingMonth?.toISOString()} has failed`);
    this.previousState();
  }
}
