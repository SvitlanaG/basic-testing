// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    //Arrange
    const initBalance = 10000;
    //Act
    const account = getBankAccount(initBalance);
    //Assert
    expect(account.getBalance()).toBe(initBalance);
  });

  test('should throw InsufficientFundsError when withdrawing more than balance', () => {
    // Arrange
    const initialBalance = 10000;
    const sumToWithdraw = 55000;
    const account = getBankAccount(initialBalance);

    // Act & Assert
    expect(() => account.withdraw(sumToWithdraw)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    // Arrange
    const initialBalance = 10000;
    const sumToTransfer = 20000;
    const accountA = getBankAccount(initialBalance);
    const accountB = getBankAccount(5000);

    // Act & Assert
    expect(() => accountA.transfer(sumToTransfer, accountB)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    // Arrange
    const initialBalance = 10000;
    const account = getBankAccount(initialBalance);
    const amount = 1000;

    // Act & Assert
    expect(() => account.transfer(amount, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    // Arrange
    const initialBalance = 10000;
    const depositAmount = 5000;
    const account = getBankAccount(initialBalance);

    // Act
    account.deposit(depositAmount);

    // Assert
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    // Arrange
    const initialBalance = 10000;
    const withdrawAmount = 4000;
    const account = getBankAccount(initialBalance);

    // Act
    account.withdraw(withdrawAmount);

    // Assert
    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    // Arrange
    const accountA = getBankAccount(10000);
    const accountB = getBankAccount(5000);
    const transferAmount = 3000;

    // Act
    accountA.transfer(transferAmount, accountB);

    // Assert
    expect(accountA.getBalance()).toBe(10000 - transferAmount);
    expect(accountB.getBalance()).toBe(5000 + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
