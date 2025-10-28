import { useCallback, DependencyList } from 'react'

export const useMemoizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList
): T => {
  return useCallback(callback, deps) as T
}

