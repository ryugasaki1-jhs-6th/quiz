import { describe, it, expect } from 'vitest';
import { generatePin, calculateScore, shuffleArray, formatTime, cn, parseCsv, toCsv } from './index';

describe('generatePin', () => {
  it('should generate a 6-digit PIN', () => {
    const pin = generatePin();
    expect(pin).toHaveLength(6);
    expect(/^\d{6}$/.test(pin)).toBe(true);
  });
});

describe('calculateScore', () => {
  it('should return base points + speed bonus for instant answer', () => {
    const score = calculateScore(0, 20, 1000);
    expect(score).toBe(1500); // 1000 + 500
  });

  it('should return base points only for answer at time limit', () => {
    const score = calculateScore(20, 20, 1000);
    expect(score).toBe(1000); // 1000 + 0
  });

  it('should return proportional bonus for mid-time answer', () => {
    const score = calculateScore(10, 20, 1000);
    expect(score).toBe(1250); // 1000 + 250
  });
});

describe('shuffleArray', () => {
  it('should return array of same length', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(arr);
    expect(shuffled).toHaveLength(5);
  });

  it('should contain same elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(arr);
    expect(shuffled.sort()).toEqual(arr.sort());
  });

  it('should not mutate original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const original = [...arr];
    shuffleArray(arr);
    expect(arr).toEqual(original);
  });
});

describe('formatTime', () => {
  it('should format seconds to mm:ss', () => {
    expect(formatTime(0)).toBe('00:00');
    expect(formatTime(65)).toBe('01:05');
    expect(formatTime(120)).toBe('02:00');
  });
});

describe('cn', () => {
  it('should join class names', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('should filter falsy values', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b');
  });
});

describe('parseCsv', () => {
  it('should parse CSV string to objects', () => {
    const csv = 'name,age\nAlice,30\nBob,25';
    const result = parseCsv(csv);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ name: 'Alice', age: '30' });
  });
});

describe('toCsv', () => {
  it('should convert objects to CSV string', () => {
    const data = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ];
    const csv = toCsv(data, ['name', 'age']);
    expect(csv).toBe('name,age\nAlice,30\nBob,25');
  });
});
