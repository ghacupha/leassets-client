import { Injectable } from '@angular/core';
import * as lodash from 'lodash';

export class NBVSummary {
  serviceOutlet!: string;
  category!: string;
  netBookValue!: number;
}

/**
 * This service is created to create a reduction of the array from back end to the
 * sum of its principal unique components i.e, the service-outlet and the asset's category
 */
@Injectable({
  providedIn: 'root',
})
export class FixedAssetNBVSummaryService {
  /**
   *
   * @param nbv_entries Which are going to be summarised
   */
  summarize(nbv_entries: NBVSummary[]): NBVSummary[] {
    const nbv_summary_groups = lodash.groupBy(nbv_entries, entry => [entry['serviceOutlet'], entry['category']]);
    return lodash.map(nbv_summary_groups, function (objs, key) {
      return {
        serviceOutlet: key.split(',')[0],
        category: key.split(',')[1],
        netBookValue: lodash.sumBy(objs, 'netBookValue'),
      };
    });
  }
}
