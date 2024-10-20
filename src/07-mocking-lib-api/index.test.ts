import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  return {
    throttle: (fn: () => unknown) => fn,
  };
});
const URL = '/todos/1';
const BASE_URL = 'https://jsonplaceholder.typicode.com';
const MOCK_RESOLVED = {
  userId: 1,
  id: 1,
  title: 'delectus aut autem',
  completed: false,
};

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mock = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({
        data: {
          userId: 1,
          id: 1,
          title: 'delectus aut autem',
          completed: false,
        },
      }),
    });

    (axios.create as jest.Mock).mockImplementation(mock);
    await throttledGetDataFromApi(URL);
    expect(mock).toHaveBeenCalledWith({
      baseURL: BASE_URL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue(MOCK_RESOLVED);
    const mockCreate = jest.fn().mockReturnValue({
      get: mockGet,
    });

    (axios.create as jest.Mock).mockImplementation(mockCreate);
    await throttledGetDataFromApi(URL);
    expect(mockGet).toHaveBeenCalledWith(URL);
  });

  test('should return response data', async () => {
    const mockGet = jest.fn().mockResolvedValue({
      data: MOCK_RESOLVED,
    });
    const mockCreate = jest.fn().mockReturnValue({
      get: mockGet,
    });

    (axios.create as jest.Mock).mockImplementation(mockCreate);
    const res = await throttledGetDataFromApi(URL);
    expect(res).toEqual(MOCK_RESOLVED);
  });
});
