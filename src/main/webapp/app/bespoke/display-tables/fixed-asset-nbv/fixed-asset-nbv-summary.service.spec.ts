import * as lodash from 'lodash';
import { FixedAssetNBVSummaryService } from 'app/bespoke/display-tables/fixed-asset-nbv/fixed-asset-nbv-summary.service';
import { NBVSummary } from 'app/bespoke/display-tables/fixed-asset-nbv/inbvsummary.model';

/**
 * This is a service test to see if we can successfully summarize datasets from the back-end
 * here on the browser
 */
describe('TDDFixedAssetNBVSummaryService', () => {
  const nbv_entries: NBVSummary[] = [
    { serviceOutletCode: 'AAA', assetCategory: 'CC', netBookValue: 1000 },
    { serviceOutletCode: 'AAA', assetCategory: 'CC', netBookValue: 1000 },
    { serviceOutletCode: 'AAA', assetCategory: 'CC', netBookValue: 1000 },
    { serviceOutletCode: 'AAA', assetCategory: 'dd', netBookValue: 3000 },
    { serviceOutletCode: 'AAA', assetCategory: 'dd', netBookValue: 3000 },
    { serviceOutletCode: 'AAA', assetCategory: 'dd', netBookValue: 3000 },
    { serviceOutletCode: 'AAA', assetCategory: 'dd', netBookValue: 3000 },
    { serviceOutletCode: 'BBB', assetCategory: 'CC', netBookValue: 2000 },
    { serviceOutletCode: 'BBB', assetCategory: 'CC', netBookValue: 2000 },
    { serviceOutletCode: 'BBB', assetCategory: 'CC', netBookValue: 2000 },
    { serviceOutletCode: 'BBB', assetCategory: 'CC', netBookValue: 2000 },
    { serviceOutletCode: 'AAA', assetCategory: 'ee', netBookValue: 4000 },
    { serviceOutletCode: 'AAA', assetCategory: 'ee', netBookValue: 4000 },
    { serviceOutletCode: 'AAA', assetCategory: 'ee', netBookValue: 4000 },
  ];
  const expected_nbv_entries: NBVSummary[] = [
    { serviceOutletCode: 'AAA', assetCategory: 'CC', netBookValue: 3000 },
    { serviceOutletCode: 'AAA', assetCategory: 'dd', netBookValue: 12000 },
    { serviceOutletCode: 'BBB', assetCategory: 'CC', netBookValue: 8000 },
    { serviceOutletCode: 'AAA', assetCategory: 'ee', netBookValue: 12000 },
  ];

  const service: FixedAssetNBVSummaryService = new FixedAssetNBVSummaryService();

  it('should Calculate Summary of the NBV entries', function () {
    const nbv_summary_groups = lodash.groupBy(nbv_entries, entry => [entry['serviceOutletCode'], entry['assetCategory']]);

    const nbv_summary: NBVSummary[] = lodash.map(nbv_summary_groups, function (objs, key) {
      return {
        serviceOutletCode: key.split(',')[0],
        assetCategory: key.split(',')[1],
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
