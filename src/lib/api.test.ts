import { add, generatePoints, fetchData } from './api';

describe('add function', () => {
  test('returns true', () => {
    expect(add(2, 2)).toEqual(4);
  });

  test('generatePoints', () => {
    const ptGen = generatePoints({ min: 2, max: 98, total: 15 });
    for (const it of ptGen) {
      console.log('*gen item: ', it);
    }
  });

  test('fetchData', async () => {
    const ptGen = fetchData();
    try {
      for await (const it of ptGen) {
        console.log('*gen item: ', it);
      }
    } catch (err) {
      console.log('error: ', err);
    }
  });
});
