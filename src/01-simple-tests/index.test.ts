// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    //Arrange
    const calculatorInput = { a: 4, b: 6, action: Action.Add };
    //Act
    const result = simpleCalculator({ ...calculatorInput });
    //Assert
    expect(result).toBe(10);
  });

  test('should subtract two numbers', () => {
    //Arrange
    const calculatorInput = { a: 7, b: 6, action: Action.Subtract };
    //Act
    const result = simpleCalculator({ ...calculatorInput });
    //Assert
    expect(result).toBe(1);
  });

  test('should multiply two numbers', () => {
    //Arrange
    const calculatorInput = { a: 5, b: 4, action: Action.Multiply };
    //Act
    const result = simpleCalculator({ ...calculatorInput });
    //Assert
    expect(result).toBe(20);
  });

  test('should divide two numbers', () => {
    //Arrange
    const calculatorInput = { a: 12, b: 6, action: Action.Divide };
    //Act
    const result = simpleCalculator({ ...calculatorInput });
    //Assert
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    //Arrange
    const calculatorInput = { a: 3, b: 3, action: Action.Exponentiate };
    //Act
    const result = simpleCalculator({ ...calculatorInput });
    //Assert
    expect(result).toBe(27);
  });

  test('should return null for invalid action', () => {
    //Arrange
    const calculatorInput = { a: 12, b: 6, action: 'plus' };
    //Act
    const result = simpleCalculator({ ...calculatorInput });
    //Assert
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    //Arrange
    const calculatorInput = { a: 'one', b: '6', action: Action.Exponentiate };
    //Act
    const result = simpleCalculator({ ...calculatorInput });
    //Assert
    expect(result).toBe(null);
  });
});
