// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  return {
    ...jest.requireActual<typeof import('./index')>('./index'),
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const mock = jest.spyOn(console, 'log');

    mockOne();
    mockTwo();
    mockThree();

    expect(mock).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const mock = jest.spyOn(console, 'log');

    unmockedFunction();

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith('I am not mocked');
  });
});
