import * as lodash from 'lodash';
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
describe('TDDNBVSummaryService', () => {
  const nbv_entries: NBVSummary[] = [];
  const expected_nbv_entries: NBVSummary[] = [];

  it('should Calculate Summary of the NBV entries', function () {
    const nbv_summary_groups: NBVSummary[] = [];

    expect(nbv_summary).toEqual(expected_nbv_entries);
  });
});
