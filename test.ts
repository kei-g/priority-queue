import { PriorityQueue } from './priority-queue'

const queue = new PriorityQueue<number>((lhs: number, rhs: number) => rhs - lhs)

const pi = [3, 1, 4, 15, 9, 2, 6, 5, 35, 8, 97]

for (const value of pi)
  queue.add(value)

while (!queue.isEmpty) {
  const value = queue.pop()
  console.debug(value)
}
