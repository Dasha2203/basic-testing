// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 101, b: 100, action: Action.Subtract, expected: 1 },
  { a: 31, b: 2, action: Action.Subtract, expected: 29 },
  { a: 1, b: 3, action: Action.Multiply, expected: 3 },
  { a: 10, b: 100, action: Action.Multiply, expected: 1000 },
  { a: 31, b: 2, action: Action.Multiply, expected: 62 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 101, b: 100, action: Action.Divide, expected: 1.01 },
  { a: 30, b: 2, action: Action.Divide, expected: 15 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 1, b: 1, action: Action.Exponentiate, expected: 1 },
  { a: 1, b: 1, action: 'smth wrong', expected: null },
  { a: 1, b: null, action: Action.Exponentiate, expected: null },
  // continue cases for other actions
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $a $action $b = $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
