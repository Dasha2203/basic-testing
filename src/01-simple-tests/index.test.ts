import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Add })).toBe(5);
    expect(simpleCalculator({ a: 10, b: 10, action: Action.Add })).toBe(20);
    expect(
      simpleCalculator({ a: 0.1, b: 0.2, action: Action.Add }),
    ).toBeCloseTo(0.3);
  });

  test('should subtract two numbers', () => {
    const arrange = { a: 101, b: 1 };
    const action = Action.Subtract;

    const act = simpleCalculator({ ...arrange, action });
    expect(act).toBe(100);
  });

  test('should multiply two numbers', () => {
    const arrange = { a: 2, b: 2 };
    const action = Action.Multiply;

    const act = simpleCalculator({ ...arrange, action });
    expect(act).toBe(4);
  });

  test('should divide two numbers', () => {
    const arrange = { a: 2, b: 2 };
    const action = Action.Divide;

    const act = simpleCalculator({ ...arrange, action });
    expect(act).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    const arrange = { a: 2, b: 3 };
    const action = Action.Exponentiate;

    const act = simpleCalculator({ ...arrange, action });
    expect(act).toBe(8);
  });

  test('should return null for invalid action', () => {
    const arrange = { a: 2, b: 2 };
    const action = 'smth wrong';

    const act = simpleCalculator({ ...arrange, action });
    expect(act).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const arrange = { a: 2, b: null };
    const action = Action.Multiply;

    const act = simpleCalculator({ ...arrange, action });
    expect(act).toBeNull();
  });
});
