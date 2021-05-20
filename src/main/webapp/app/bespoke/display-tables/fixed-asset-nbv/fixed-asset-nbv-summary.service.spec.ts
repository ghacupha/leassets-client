import * as lodash from 'lodash';
import { FixedAssetNBVSummaryService } from 'app/bespoke/display-tables/fixed-asset-nbv/fixed-asset-nbv-summary.service';
/**
 * Sample NBV class
 */
class NBVSummary {
  serviceOutlet!: string;
  category!: string;
  netBookValue!: number;
}

/**
 * This is a service test to see if we can successfully summarize datasets from the back-end
 * here on the browser
 */
describe('TDDFixedAssetNBVSummaryService', () => {
  const nbv_entries: NBVSummary[] = [
    { serviceOutlet: 'AAA', category: 'CC', netBookValue: 1000 },
    { serviceOutlet: 'AAA', category: 'CC', netBookValue: 1000 },
    { serviceOutlet: 'AAA', category: 'CC', netBookValue: 1000 },
    { serviceOutlet: 'AAA', category: 'dd', netBookValue: 3000 },
    { serviceOutlet: 'AAA', category: 'dd', netBookValue: 3000 },
    { serviceOutlet: 'AAA', category: 'dd', netBookValue: 3000 },
    { serviceOutlet: 'AAA', category: 'dd', netBookValue: 3000 },
    { serviceOutlet: 'BBB', category: 'CC', netBookValue: 2000 },
    { serviceOutlet: 'BBB', category: 'CC', netBookValue: 2000 },
    { serviceOutlet: 'BBB', category: 'CC', netBookValue: 2000 },
    { serviceOutlet: 'BBB', category: 'CC', netBookValue: 2000 },
    { serviceOutlet: 'AAA', category: 'ee', netBookValue: 4000 },
    { serviceOutlet: 'AAA', category: 'ee', netBookValue: 4000 },
    { serviceOutlet: 'AAA', category: 'ee', netBookValue: 4000 },
  ];
  const expected_nbv_entries: NBVSummary[] = [
    { serviceOutlet: 'AAA', category: 'CC', netBookValue: 3000 },
    { serviceOutlet: 'AAA', category: 'dd', netBookValue: 12000 },
    { serviceOutlet: 'BBB', category: 'CC', netBookValue: 8000 },
    { serviceOutlet: 'AAA', category: 'ee', netBookValue: 12000 },
  ];

  const service: FixedAssetNBVSummaryService = new FixedAssetNBVSummaryService();

  it('should Calculate Summary of the NBV entries', function () {
    const nbv_summary_groups = lodash.groupBy(nbv_entries, entry => [entry['serviceOutlet'], entry['category']]);

    const nbv_summary: NBVSummary[] = lodash.map(nbv_summary_groups, function (objs, key) {
      return {
        serviceOutlet: key.split(',')[0],
        category: key.split(',')[1],
        netBookValue: lodash.sumBy(objs, 'netBookValue'),
      };
    });

    expect(nbv_summary).toEqual(expected_nbv_entries);
  });

  it('should Calculate Summary of the NBV entries using the service', function () {
    const nbv_summary: NBVSummary[] = service.summarize(nbv_entries);

    expect(nbv_summary).toEqual(expected_nbv_entries);
  });
});
