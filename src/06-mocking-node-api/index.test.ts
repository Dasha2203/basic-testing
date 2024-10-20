import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'node:path';
import fs from 'node:fs';

const clb = () => 'Smth string return';
describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const mls = 10000;
    doStuffByTimeout(clb, mls);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(clb, mls);
  });

  test('should call callback only after timeout', () => {
    const mock = jest.fn(clb);
    const mls = 10000;

    expect(mock).not.toHaveBeenCalled();
    doStuffByTimeout(mock, mls);
    expect(mock).not.toBeCalled();

    jest.advanceTimersByTime(mls);
    expect(mock).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mock = jest.spyOn(global, 'setInterval');
    const mls = 10000;
    doStuffByInterval(clb, mls);

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith(clb, mls);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const COUNT = 10;
    const mls = 1000;
    const mockClb = jest.fn(clb);
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(mockClb, mls);

    for (let i = 1; i <= COUNT; i++) {
      jest.advanceTimersByTime(mls);
      expect(mockClb).toBeCalledTimes(i);
    }
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const PATH_TO_FILE = 'test.txt';
    const mock = jest.spyOn(path, 'join');

    const res = await readFileAsynchronously(PATH_TO_FILE);

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith(__dirname, PATH_TO_FILE);
    expect(res).not.toBeNull();
  });

  test('should return null if file does not exist', async () => {
    const PATH_TO_FILE = 'text.txt';
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    await expect(readFileAsynchronously(PATH_TO_FILE)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const PATH_TO_FILE = 'test.txt';
    const CONTENT = 'Some text here';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(CONTENT);

    await expect(readFileAsynchronously(PATH_TO_FILE)).resolves.toBe(CONTENT);
  });
});
