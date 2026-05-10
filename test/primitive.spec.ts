import { type Comparator, PriorityQueue } from '../src/index.ts'
import { describe, it } from 'mocha'
import { deepEqual } from 'node:assert'

const ascending = (lhs: number, rhs: number) => rhs - lhs
const ascendingByValue = (lhs: [number, number], rhs: [number, number]) => rhs[1] - lhs[1]
const descending = (lhs: number, rhs: number) => lhs - rhs
const sequence = [3, 1, 4, 15, 9, 2, 6, 5, 35, 8, 97, 93]
const test = (comparator: Comparator<number>, reverseComparator: Comparator<number>) => () => {
  const queue = new PriorityQueue<number>(comparator)
  for (const value of sequence)
    queue.add(value)
  const array = [] as number[]
  while (!queue.isEmpty)
    array.push(queue.pop())
  deepEqual(array, sequence.sort(reverseComparator))
}

describe(
  'primitive',
  () => {
    it('ascending', test(ascending, descending))
    it('descending', test(descending, ascending))
    it(
      'update after pop',
      () => {
        const queue = new PriorityQueue<[number, number], number>(ascendingByValue, item => item[0])
        const source = sequence.map((value, index) => [index, value] as [number, number])
        for (const pair of source)
          queue.add(pair)
        const popped = new Set<number>()
        for (let i = 0; i < 3; i++) {
          const [_, value] = queue.pop()
          popped.add(value)
        }
        source[8][1] = 10 // change value from 5 to 10 at index 8
        queue.update(8)
        const array = [] as [number, number][]
        while (!queue.isEmpty)
          array.unshift(queue.pop())
        const expected = source.filter(([_, value]) => !popped.has(value)).sort(ascendingByValue)
        deepEqual(array, expected)
      }
    )
    it(
      'update before pop',
      () => {
        const queue = new PriorityQueue<[number, number], number>(ascendingByValue, item => item[0])
        const source = sequence.map((value, index) => [index, value] as [number, number])
        for (const pair of source)
          queue.add(pair)
        source[8][1] = 10 // change value from 5 to 10 at index 8
        queue.update(8)
        const array = [] as [number, number][]
        while (!queue.isEmpty)
          array.unshift(queue.pop())
        const expected = source.sort(ascendingByValue)
        deepEqual(array, expected)
      }
    )
  }
)
