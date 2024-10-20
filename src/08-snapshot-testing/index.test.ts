import { generateLinkedList } from './index';

const data = [
  {
    fruit: 'apple',
    id: 1,
  },
  {
    fruit: 'banana',
    id: 2,
  },
  {
    fruit: 'cherry',
    id: 3,
  },
];

const expectedData = {
  value: {
    fruit: 'apple',
    id: 1,
  },
  next: {
    value: {
      fruit: 'banana',
      id: 2,
    },
    next: {
      value: {
        fruit: 'cherry',
        id: 3,
      },
      next: {
        value: null,
        next: null,
      },
    },
  },
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(data)).toStrictEqual(expectedData);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(data)).toMatchSnapshot();
  });
});
