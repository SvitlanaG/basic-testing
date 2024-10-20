// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
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
    // Arrange:
    const spy = jest.spyOn(console, 'log');

    // Act:
    mockOne();
    mockTwo();
    mockThree();

    // Assert:
    expect(spy).not.toHaveBeenCalled();

    // Clean:
    spy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    // Arrange:
    const spy = jest.spyOn(console, 'log');

    // Act:
    unmockedFunction();

    // Assert:
    expect(spy).toHaveBeenCalledWith('I am not mocked');

    // Clean:
    spy.mockRestore();
  });
});
