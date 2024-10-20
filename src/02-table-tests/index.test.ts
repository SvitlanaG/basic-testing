// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 8, b: 7, action: Action.Subtract, expected: 1 },
  { a: 10, b: 1, action: Action.Subtract, expected: 9 },
  { a: 20, b: 10, action: Action.Subtract, expected: 10 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 10, b: 3, action: Action.Multiply, expected: 30 },
  { a: 0, b: 8, action: Action.Multiply, expected: 0 },
  { a: 49, b: 7, action: Action.Divide, expected: 7 },
  { a: 18, b: 9, action: Action.Divide, expected: 2 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 3, b: 1, action: Action.Exponentiate, expected: 3 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should correctly calculates the result based on the action',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
