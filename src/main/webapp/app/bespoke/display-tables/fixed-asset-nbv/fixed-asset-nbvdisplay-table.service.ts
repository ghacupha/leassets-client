import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import { NBVSummary } from 'app/bespoke/display-tables/fixed-asset-nbv/inbvsummary.model';
import { FixedAssetNBVSummaryService } from 'app/bespoke/display-tables/fixed-asset-nbv/fixed-asset-nbv-summary.service';
// import { IFixedAssetNetBookValue } from 'app/entities/fixed-asset-net-book-value/fixed-asset-net-book-value.model';

export type EntityResponseType = HttpResponse<NBVSummary>;
export type EntityArrayResponseType = HttpResponse<NBVSummary[]>;

@Injectable({
  providedIn: 'root',
})
export class FixedAssetNBVDisplayTableService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/fixed-asset-net-book-values');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<NBVSummary[]>(this.resourceUrl, { params: options, observe: 'response' });
    // .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  // protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
  //   if (res.body) {
  //     res.body.forEach((fixedAssetNetBookValue: NBVSummary) => {
  //       fixedAssetNetBookValue.netBookValueDate = fixedAssetNetBookValue.netBookValueDate
  //         ? dayjs(fixedAssetNetBookValue.netBookValueDate)
  //         : undefined;
  //     });
  //   }
  //   return res;
  // }
}
