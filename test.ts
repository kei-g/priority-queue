import { PriorityQueue } from './priority-queue'

const queue = new PriorityQueue<number>((lhs: number, rhs: number) => rhs - lhs)

queue.add(3)
queue.add(1)
queue.add(4)
queue.add(15)
queue.add(9)
queue.add(2)
queue.add(6)
queue.add(5)
queue.add(35)
queue.add(8)
queue.add(97)

while (!queue.isEmpty) {
  const value = queue.pop()
  console.debug(value)
}
