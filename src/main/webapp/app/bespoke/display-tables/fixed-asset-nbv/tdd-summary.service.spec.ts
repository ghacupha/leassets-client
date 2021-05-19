import * as lodash from 'lodash';

/**
 * Sample object whose array summary we try to create
 */
class Car {
  make!: string;
  model!: string;
  year!: string;
  price?: number;
}

/**
 * This is a sample to test how an implementation of a group-by algorithm might be done
 * with the greatest efficiency using lodash. The actual implementation will use the same
 * approach to summarize data array from the back-end. This is considered TDD approach to this
 * design problem since at the time the test is being created a solid implementation does not exist
 * since we are just "playing around" with various alternatives
 */
describe('ArraySummaryServiceTDDTest', () => {
  // Original Array
  const cars: Car[] = [
    { make: 'audi', model: 'r8', year: '2012' },
    { make: 'audi', model: 'r8', year: '2013' },
    { make: 'audi', model: 'rs5', year: '2013' },
    { make: 'audi', model: 'rs5', year: '2012' },
    { make: 'ford', model: 'mustang', year: '2012' },
    { make: 'ford', model: 'focus', year: '2012' },
    { make: 'ford', model: 'focus', year: '2013' },
    { make: 'ford', model: 'mustang', year: '2013' },
    { make: 'ford', model: 'fusion', year: '2012' },
    { make: 'ford', model: 'fusion', year: '2015' },
    { make: 'kia', model: 'optima', year: '2012' },
    { make: 'kia', model: 'optima', year: '2014' },
    { make: 'kia', model: 'sportage', year: '2014' },
    { make: 'kia', model: 'sportage', year: '2012' },
  ];

  // Same array but the cars now have prices
  const cars_with_prices: Car[] = [
    { make: 'audi', model: 'r8', year: '2012', price: 1000 },
    { make: 'audi', model: 'r8', year: '2013', price: 1000 },
    { make: 'audi', model: 'rs5', year: '2013', price: 1000 },
    { make: 'audi', model: 'rs5', year: '2012', price: 1000 },
    { make: 'ford', model: 'mustang', year: '2012', price: 1000 },
    { make: 'ford', model: 'focus', year: '2012', price: 1000 },
    { make: 'ford', model: 'focus', year: '2013', price: 1000 },
    { make: 'ford', model: 'mustang', year: '2013', price: 1000 },
    { make: 'ford', model: 'fusion', year: '2012', price: 1000 },
    { make: 'ford', model: 'fusion', year: '2015', price: 1000 },
    { make: 'kia', model: 'optima', year: '2012', price: 1000 },
    { make: 'kia', model: 'optima', year: '2014', price: 1000 },
    { make: 'kia', model: 'sportage', year: '2014', price: 1000 },
    { make: 'kia', model: 'sportage', year: '2012', price: 1000 },
  ];

  // Array after running group-by using make
  const expected_car_list = {
    audi: [
      { make: 'audi', model: 'r8', year: '2012' },
      { make: 'audi', model: 'r8', year: '2013' },
      { make: 'audi', model: 'rs5', year: '2013' },
      { make: 'audi', model: 'rs5', year: '2012' },
    ],
    ford: [
      { make: 'ford', model: 'mustang', year: '2012' },
      { make: 'ford', model: 'focus', year: '2012' },
      { make: 'ford', model: 'focus', year: '2013' },
      { make: 'ford', model: 'mustang', year: '2013' },
      { make: 'ford', model: 'fusion', year: '2012' },
      { make: 'ford', model: 'fusion', year: '2015' },
    ],
    kia: [
      { make: 'kia', model: 'optima', year: '2012' },
      { make: 'kia', model: 'optima', year: '2014' },
      { make: 'kia', model: 'sportage', year: '2014' },
      { make: 'kia', model: 'sportage', year: '2012' },
    ],
  };

  // Array after running group-by using make and year
  const expected_car_list2 = {
    'audi,2012': [
      { make: 'audi', model: 'r8', year: '2012' },
      { make: 'audi', model: 'rs5', year: '2012' },
    ],
    'audi,2013': [
      { make: 'audi', model: 'r8', year: '2013' },
      { make: 'audi', model: 'rs5', year: '2013' },
    ],
    'ford,2012': [
      { make: 'ford', model: 'mustang', year: '2012' },
      { make: 'ford', model: 'focus', year: '2012' },
      { make: 'ford', model: 'fusion', year: '2012' },
    ],
    'ford,2013': [
      { make: 'ford', model: 'focus', year: '2013' },
      { make: 'ford', model: 'mustang', year: '2013' },
    ],
    'ford,2015': [{ make: 'ford', model: 'fusion', year: '2015' }],
    'kia,2012': [
      { make: 'kia', model: 'optima', year: '2012' },
      { make: 'kia', model: 'sportage', year: '2012' },
    ],
    'kia,2014': [
      { make: 'kia', model: 'optima', year: '2014' },
      { make: 'kia', model: 'sportage', year: '2014' },
    ],
  };

  // This is the calculation result we want for average price
  const expected_average_price_per_model_per_year = [
    { make: 'audi', year: '2012', price: 1000 },
    { make: 'audi', year: '2013', price: 1000 },
    { make: 'ford', year: '2012', price: 1000 },
    { make: 'ford', year: '2013', price: 1000 },
    { make: 'ford', year: '2015', price: 1000 },
    { make: 'kia', year: '2012', price: 1000 },
    { make: 'kia', year: '2014', price: 1000 },
  ];

  // This is the calculation result we want for total price
  const expected_total_price_per_model_per_year = [
    { make: 'audi', year: '2012', price: 2000 },
    { make: 'audi', year: '2013', price: 2000 },
    { make: 'ford', year: '2012', price: 3000 },
    { make: 'ford', year: '2013', price: 2000 },
    { make: 'ford', year: '2015', price: 1000 },
    { make: 'kia', year: '2012', price: 2000 },
    { make: 'kia', year: '2014', price: 2000 },
  ];

  /**
   * This test takes a variable and without mapping it produces an object whose fields
   * consist the iteratee (make), and each of whose value will be an array that agrees to the
   * iteratee
   */
  it('should summarize data using lodash', () => {
    // Using of _.groupBy() method
    // with the `_.property` iteratee shorthand
    const grouped_cars = lodash.groupBy(cars, 'make');

    expect(grouped_cars).toEqual(expected_car_list);
  });

  /**
   * This test does the same as the previous test, but this time we are
   * going to use a composite iteratee
   */
  it('should summarize data using lodash for properties', () => {
    // Using of _.groupBy() method
    const grouped_cars2 = lodash.groupBy(cars, item => [item['make'], item['year']]);

    expect(grouped_cars2).toEqual(expected_car_list2);
  });

  /**
   * This test is like the previous but for each composite iteratee we
   * get the sum total for the prices of the car that correspond to the iteratee
   */
  it('should summarize data and get sum of price per car-model per year', () => {
    // Using lodash.groupBy() method to get groups on make and year
    const grouped_cars = lodash.groupBy(cars_with_prices, item => [item['make'], item['year']]);

    // map make and year and lodash.sumBy to aggregate price
    const mapped_cars_total_price = lodash.map(grouped_cars, function (objs, key) {
      return {
        make: key.split(',')[0],
        year: key.split(',')[1],
        price: lodash.sumBy(objs, 'price'),
      };
    });

    expect(mapped_cars_total_price).toEqual(expected_total_price_per_model_per_year);
  });

  /**
   * This test is exactly like the previous result except that it is designed to check
   * the capability of coming up with a computation of the average price
   */
  it('should summarize data and get average price per car-model per year', () => {
    // Using lodash.groupBy() method to get groups on make and year
    const grouped_cars = lodash.groupBy(cars_with_prices, item => [item['make'], item['year']]);

    // map make and year and lodash.sumBy to aggregate price as average
    const mapped_cars_average_price = lodash.map(grouped_cars, function (objs, key) {
      return {
        make: key.split(',')[0],
        year: key.split(',')[1],
        price: lodash.sumBy(objs, 'price') / objs.length,
      };
    });

    expect(mapped_cars_average_price).toEqual(expected_average_price_per_model_per_year);
  });
});
