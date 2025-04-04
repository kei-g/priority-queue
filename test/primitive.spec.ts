import { Comparator, PriorityQueue } from '../src'
import { describe, it } from 'mocha'
import { deepEqual } from 'node:assert'

describe('primitive', () => {
  const ascending = (lhs: number, rhs: number) => rhs - lhs
  const descending = (lhs: number, rhs: number) => lhs - rhs
  const sequence = [3, 1, 4, 15, 9, 2, 6, 5, 35, 8, 97, 93]
  const test = (comparator: Comparator<number>, reverseComparator: Comparator<number>) => {
    return () => {
      const queue = new PriorityQueue<number>(comparator)
      for (const value of sequence)
        queue.add(value)
      const array = [] as number[]
      while (!queue.isEmpty)
        array.push(queue.pop())
      deepEqual(array, sequence.sort(reverseComparator))
    }
  }
  it('ascending', test(ascending, descending))
  it('descending', test(descending, ascending))
})
