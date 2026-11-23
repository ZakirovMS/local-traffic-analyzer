import { describe, it, expect } from 'vitest';
import { add } from './math';

describe('Функция add', () => {
  it('must add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });
});
