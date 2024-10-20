import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    // Arrange
    const pathToPhotos = '/photos';
    const axiosInstance = { get: jest.fn().mockResolvedValue({ data: {} }) };
    (axios.create as jest.Mock).mockReturnValue(axiosInstance);

    // Act
    await throttledGetDataFromApi(pathToPhotos);

    // Assert:
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // Arrange
    const relativePath = '/photos';
    const mockData = { id: 1, title: 'My awesome Title' };
    const axiosInstance = {
      get: jest.fn().mockResolvedValue({ data: mockData }),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosInstance);

    // Act
    await throttledGetDataFromApi(relativePath);

    // Assert:
    expect(axiosInstance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    // Arrange
    const relativePath = '/photos';
    const mockResponseData = { id: 1, title: 'My awesome Title' };
    const axiosInstance = {
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
    };

    (axios.create as jest.Mock).mockReturnValue(axiosInstance);

    // Act
    const result = await throttledGetDataFromApi(relativePath);

    // Assert:
    expect(result).toEqual(mockResponseData);
  });
});
