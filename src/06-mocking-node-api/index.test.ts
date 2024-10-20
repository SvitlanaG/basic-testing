// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Arrange:
    const mockCallback = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    // Act:
    doStuffByTimeout(mockCallback, 3000);

    // Assert:
    expect(setTimeoutSpy).toHaveBeenCalledWith(mockCallback, 3000);

    // Clean:
    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    // Arrange:
    const mockCallback = jest.fn();

    // Act:
    doStuffByTimeout(mockCallback, 3000);
    jest.advanceTimersByTime(3000);

    // Assert:
    expect(mockCallback).toHaveBeenCalledTimes(1);
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
    // Arrange:
    const mockCallback = jest.fn();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    // Act:
    doStuffByInterval(mockCallback, 3000);

    // Assert:
    expect(setIntervalSpy).toHaveBeenCalledWith(mockCallback, 3000);

    // Clean:
    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Arrange:
    const mockCallback = jest.fn();

    // Act:
    doStuffByInterval(mockCallback, 1000);
    jest.advanceTimersByTime(3000);

    // Assert:
    expect(mockCallback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Arrange:
    const mockJoin = join as jest.MockedFunction<typeof join>;
    const mockExistsSync = existsSync as jest.MockedFunction<typeof existsSync>;

    mockJoin.mockReturnValue('/mocked/pathToFile');
    mockExistsSync.mockReturnValue(false);

    // Act:
    await readFileAsynchronously('myTestFile.txt');

    // Assert:
    expect(mockJoin).toHaveBeenCalledWith(__dirname, 'myTestFile.txt');
  });

  test('should return null if file does not exist', async () => {
    // Arrange:
    const mockExistsSync = existsSync as jest.MockedFunction<typeof existsSync>;
    mockExistsSync.mockReturnValue(false);

    // Act:
    const result = await readFileAsynchronously('myTestFile.txt');

    // Assert:
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Arrange:
    const mockExistsSync = existsSync as jest.MockedFunction<typeof existsSync>;
    const mockReadFile = readFile as jest.MockedFunction<typeof readFile>;

    mockExistsSync.mockReturnValue(true);
    mockReadFile.mockResolvedValue(Buffer.from('Awesome content'));

    // Act:
    const result = await readFileAsynchronously('existingFile.txt');

    // Assert:
    expect(result).toBe('Awesome content');
  });
});
