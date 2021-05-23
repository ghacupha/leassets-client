/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Moment } from 'moment';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { RouteStateService } from 'app/bespoke/route-state.service';
import { INavigationQuestionnaire } from 'app/bespoke/navigation-questionnaire/navigation-questionnaire.model';
import { NavigationQuestionnaireModalService } from 'app/bespoke/navigation-questionnaire/navigation-questionnaire-modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DATE_FORMAT } from 'app/config/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { FixedAssetNBVDisplayTableService } from './fixed-asset-nbvdisplay-table.service';
import { NBVSummary } from 'app/bespoke/display-tables/fixed-asset-nbv/inbvsummary.model';
import { FixedAssetNBVSummaryService } from 'app/bespoke/display-tables/fixed-asset-nbv/fixed-asset-nbv-summary.service';

@Component({
  selector: 'gha-fixed-asset-nbv',
  templateUrl: './fixed-asset-nbv.component.html',
  styleUrls: ['./fixed-asset-nbv.component.scss'],
})
export class FixedAssetNbvComponent implements OnInit {
  dtOptions: any = {};
  dtTrigger: any = new Subject<any>();
  reportingMonth?: Moment;

  displayDataArray!: NBVSummary[];

  constructor(
    protected router: Router,
    protected jhiAlertService: JhiAlertService,
    private log: NGXLogger,
    private listService: FixedAssetNBVDisplayTableService,
    protected routeStateService: RouteStateService<INavigationQuestionnaire>,
    protected navigationPathServiceService: RouteStateService<string>,
    protected navigationQuestionnaireModelService: NavigationQuestionnaireModalService,
    protected modalService: NgbModal,
    private summaryService: FixedAssetNBVSummaryService
  ) {
    this.reportingMonth = this.routeStateService.data.reportingPeriod;
    this.routeStateService.reset();
    this.navigationPathServiceService.reset();

    this.firstPassDataUpdate(this.reportingMonth);
  }

  ngOnInit(): void {
    this.navigationQuestionnaireModelService.close();
    this.dtOptions = this.getDataTableOptions();
    this.log.debug(`Creating data-table for net-book-value entries in the month of : ${this.reportingMonth}`);
    this.secondPassDataUpdate();
  }

  onError(errorMessage: string): void {
    this.jhiAlertService.error(errorMessage, null, '');
    this.log.error(`Error while extracting data from API ${errorMessage}`);

    this.previousView();
  }

  protected previousView(): void {
    const navigation = this.router.navigate(['fixed-asset-net-book-value']);
    navigation.then(() => {
      this.log.debug(`Well! This was not supposed to happen. Review request parameters and reiterate`);
    });
  }

  private getDataTableOptions(): DataTables.Settings {
    return (this.dtOptions = {
      searching: true,
      paging: true,
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      dom: 'Bfrtip',
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print', 'colvis'],
    });
  }

  private secondPassDataUpdate(): void {
    this.listService.query(this.reportingMonth!.format(DATE_FORMAT)).subscribe(
      res => {
        // this.displayDataArray to be summarized with the summary-service
        this.displayDataArray = this.summaryService.summarize(res.body ?? []);
        this.dtTrigger.next();
      },
      err => this.onError(err.toString()),
      () => this.log.info(`Extracted ${this.displayDataArray.length} view items from API`)
    );
  }

  private firstPassDataUpdate(reportingMonth?: Moment): void {
    if (reportingMonth) {
      this.listService.query(reportingMonth.format(DATE_FORMAT)).subscribe(
        res => {
          this.displayDataArray = res.body ?? [];
        },
        err => this.onError(err.toString()),
        () => this.log.info(`Extracted ${this.displayDataArray.length} view items from API`)
      );
    }
  }
}
