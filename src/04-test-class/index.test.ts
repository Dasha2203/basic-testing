// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

const INITIAL_BALANCE = 100;
const ANOTHER_INITIAL_BALANCE = 200;

describe('BankAccount', () => {
  let account: BankAccount;
  let otherAccount: BankAccount;
  beforeEach(() => {
    account = getBankAccount(INITIAL_BALANCE);
    otherAccount = getBankAccount(ANOTHER_INITIAL_BALANCE);
    jest.clearAllMocks();
  });
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawAmount = 200;
    expect(() => account.withdraw(withdrawAmount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const amount = 105;
    expect(() => account.transfer(amount, otherAccount)).toThrowError(
      new InsufficientFundsError(account.getBalance()),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const amount = 105;
    expect(() => account.transfer(amount, account)).toThrowError(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const amount = 50;
    const totalAmount = amount + INITIAL_BALANCE;

    account.deposit(amount);

    expect(account.getBalance()).toBe(totalAmount);
  });

  test('should withdraw money', () => {
    const amount = 50;
    const totalAmount = INITIAL_BALANCE - amount;

    account.withdraw(amount);

    expect(account.getBalance()).toBe(totalAmount);
  });

  test('should transfer money', () => {
    const amount = 50;
    const totalFirstAccount = INITIAL_BALANCE - amount;
    const totalOtherAccount = ANOTHER_INITIAL_BALANCE + amount;

    account.transfer(amount, otherAccount);

    expect(account.getBalance()).toBe(totalFirstAccount);
    expect(otherAccount.getBalance()).toBe(totalOtherAccount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const amount = 80;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(amount);
    const balance = await account.fetchBalance();
    expect(balance).toBe(amount);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const amount = 80;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(amount);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(amount);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
