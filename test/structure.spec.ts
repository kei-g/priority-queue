import { Comparator, PriorityQueue } from '../src'
import { assert, expect } from 'chai'
import { describe, it } from 'mocha'

class PI {
  constructor(readonly id: number, public value: number) {
  }

  get clone(): PI {
    return new PI(this.id, this.value)
  }
}

class PriorityQueuePI extends PriorityQueue<PI, number> {
  private readonly reverseComparator: Comparator<PI>

  constructor(order: 'ascending' | 'descending', sequence: number[], cb?: (pi: PI) => void) {
    const comparators = {
      ascending: (lhs: PI, rhs: PI) => rhs.value - lhs.value,
      descending: (lhs: PI, rhs: PI) => lhs.value - rhs.value,
    }
    super(comparators[order], (pi: PI) => pi.id)
    this.reverseComparator = {
      ascending: comparators.descending,
      descending: comparators.ascending,
    }[order]
    this.init(sequence, cb)
  }

  private init(sequence: number[], cb?: (pi: PI) => void) {
    for (let i = 0; i < sequence.length; i++) {
      const pi = new PI(i + 1, sequence[i])
      if (cb)
        cb(pi)
      this.add(pi)
    }
  }

  private sort(data: PI[] | Record<number, PI>): PI[] {
    if (data instanceof Array)
      return data.sort(this.reverseComparator)
    const array = [] as PI[]
    for (const id in data)
      array.push(data[id])
    return this.sort(array)
  }

  test(data: PI[] | Record<number, PI>): void {
    const a = this.toArray()
    expect(a).deep.equal(this.sort(data))
  }

  toArray(): PI[] {
    const array = [] as PI[]
    while (!this.isEmpty)
      array.push(this.pop())
    return array
  }
}

const sequence = [3, 1, 4, 15, 9, 2, 6, 5, 35, 8, 97, 93]
const PIs = sequence.map((value: number, index: number) => new PI(index + 1, value))

for (const order of ['ascending', 'descending'] as ('ascending' | 'descending')[])
  describe(order, () => {
    const ctor = (cb?: (pi: PI) => void) => new PriorityQueuePI(order, sequence, cb)
    it('decrease', () => {
      const records = {} as Record<number, PI>
      const queue = ctor((pi: PI) => records[pi.id] = pi)
      records[4].value = Math.PI
      queue.update(4)
      queue.test(records)
    })
    it('increase', () => {
      const records = {} as Record<number, PI>
      const queue = ctor((pi: PI) => records[pi.id] = pi)
      records[2].value = Math.PI
      queue.update(2)
      queue.test(records)
    })
    it('linear', () => {
      const queue = ctor()
      queue.test(PIs)
    })
  })

describe('exception', () => {
  const ctor = () => new PriorityQueuePI('ascending', sequence)
  it('not found', () => {
    const queue = ctor()
    assert.throw(() => queue.update(sequence.length + 1))
  })
  it('over pop', () => {
    const queue = ctor()
    queue.toArray()
    assert.throw(() => queue.pop())
  })
  it('over update', () => {
    const queue = ctor()
    queue.toArray()
    assert.throw(() => queue.update(1))
  })
})
