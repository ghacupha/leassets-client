import * as lodash from 'lodash';

/**
 * Sample object whose array summary we try to create
 */
class Car {
  make!: string;
  model!: string;
  year!: string;
}

/**
 * This is a sample to test how an implementation of a group-by algorithm might be done
 * with the greatest efficiency
 */
describe('NBVSummaryServiceTDDTest', () => {
  // Original Array
  const cars: Car[] = [
    { make: 'audi', model: 'r8', year: '2012' },
    { make: 'audi', model: 'rs5', year: '2013' },
    { make: 'ford', model: 'mustang', year: '2012' },
    { make: 'ford', model: 'fusion', year: '2015' },
    { make: 'kia', model: 'optima', year: '2012' },
  ];

  // Array after running group-by using make
  const expected_car_list = {
    audi: [
      { make: 'audi', model: 'r8', year: '2012' },
      { make: 'audi', model: 'rs5', year: '2013' },
    ],
    ford: [
      { make: 'ford', model: 'mustang', year: '2012' },
      { make: 'ford', model: 'fusion', year: '2015' },
    ],
    kia: [{ make: 'kia', model: 'optima', year: '2012' }],
  };

  it('should summarize data using lodash', () => {
    // Using of _.groupBy() method
    // with the `_.property` iteratee shorthand
    let grouped_cars = lodash.groupBy(cars, 'make');
    console.log(grouped_cars);
    expect(grouped_cars).toEqual(expected_car_list);
  });
});
