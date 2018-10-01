import { formatAsMoney } from "./helpers";

describe('Helpers Tests', () => {
  describe('formatAsMoney', () => {
    test('should return 100 as 100.00', () => {
      expect(formatAsMoney(100)).toBe("100.00");
    });

    test('should return 10000 as 10,000.00', () => {
      expect(formatAsMoney(10000)).toBe('10,000.00');
    });

    test('should return 10000000 as 10,000,000.00', () => {
      expect(formatAsMoney(10000000)).toBe('10,000,000.00');
    });

    test('should return 10.99 as 10.99', () => {
      expect(formatAsMoney(10.99)).toBe('10.99');
    });

    test('should return 1.999 as 1.99', () => {
      expect(formatAsMoney(1.999)).toBe('1.99');
    });

    test('should return ABC as NaN', () => {
      expect(formatAsMoney("ABC")).toBe("NaN");
    });
  });
});