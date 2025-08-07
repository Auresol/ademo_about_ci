import { renderHook, act } from '@testing-library/react';
import useCounter from '../src/hooks/features/homepage/useCounter';
import { describe, it, expect } from 'vitest';

describe('useCounter', () => {
  it('should initialize count to 0 and val to 1', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
    expect(result.current.val).toBe(1);
  });

  it('should increment count by the default value of 1', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  it('should update val and increment by new val', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.setVal(5);
    });
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(5);
  });

  it('should handle multiple increments', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });
    expect(result.current.count).toBe(3);
  });

  it('should handle multiple updates to val before incrementing', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.setVal(2);
    });
    act(() => {
      result.current.increment();
    });
    act(() => {
      result.current.setVal(10);
    });
    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(12);
    expect(result.current.val).toBe(10);
  });
});