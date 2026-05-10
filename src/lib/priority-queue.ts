import { assert } from 'node:console'

/**
 * 比較関数
 */
export type Comparator<T> = (lhs: T, rhs: T) => number

/**
 * 識別子選択関数
 */
export type Identifier<T, K> = (value: T) => K

/**
 * 優先度付きキュー
 */
export class PriorityQueue<T, K = never> {
  private readonly compareItems: Comparator<T>
  private readonly identify: Identifier<T, K> | undefined
  private readonly indices: Map<K, number> = new Map<K, number>()
  private readonly items: T[] = [undefined]

  /**
   * コンストラクタ
   * @param comparator 比較関数
   * @param identifier 識別子選択関数
   */
  constructor(comparator: Comparator<T>, identifier?: Identifier<T, K>) {
    this.compareItems = comparator
    this.identify = identifier
  }

  /**
   * 指定した値を持つアイテムを追加する
   * @param value 値
   */
  add(value: T): void {
    const index = this.length + 1
    if (this.identify) {
      const key = this.identify(value)
      this.indices.set(key, index)
    }
    this.items.push(value)
    this.cascadeUp(index)
  }

  private cascadeDown(index: number): void {
    const { length } = this
    for (let current = index * 2; current <= length; current *= 2) {
      const right = current + 1
      if (current < length && this.compareAt(current, right) < 0)
        current = right
      if (this.compareAt(index, current) < 0)
        this.swap(index, current)
      index = current
    }
  }

  private cascadeUp(index: number): void {
    while (1 < index) {
      const parent = Math.floor(index / 2)
      if (this.compareAt(index, parent) < 0)
        break
      this.swap(index, parent)
      index = parent
    }
  }

  /**
   * 指定したインデックスのアイテムを比較する
   *
   * @param lhs 左辺のインデックス
   * @param rhs 右辺のインデックス
   * @returns 比較結果
   */
  private compareAt(lhs: number, rhs: number): number {
    return this.compareItems(this.items[lhs], this.items[rhs])
  }

  /**
   * キューが空かどうか
   */
  get isEmpty(): boolean {
    return this.length === 0
  }

  /**
   * アイテムの数
   */
  get length(): number {
    return this.items.length - 1
  }

  /**
   * 最も優先度の高いアイテムをキューから取り除き、その値を返す
   * @returns 最も優先度の高いアイテムの値
   */
  pop(): T {
    const { length } = this
    if (length === 0)
      throw new Error('No item in PriorityQueue')
    this.swap(1, length)
    const value = this.items.pop()
    if (this.identify) {
      const key = this.identify(value)
      this.indices.delete(key)
    }
    this.cascadeDown(1)
    return value
  }

  private swap(i: number, j: number): void {
    const [u, v] = [this.items[i], this.items[j]]
    if (this.identify) {
      this.indices.set(this.identify(u), j)
      this.indices.set(this.identify(v), i)
    }
    [this.items[i], this.items[j]] = [v, u]
  }

  /**
   * 指定された識別子を持つアイテムの順序を更新する
   * @param key 更新対象の識別子
   */
  update(key: K): void {
    const { length } = this
    if (length < 1)
      throw new Error('No item in PriorityQueue')
    if (!this.indices.has(key))
      throw new Error(`Not found in PriorityQueue, ${key}`)
    const index = this.indices.get(key)
    assert(index <= length)
    this.cascadeUp(index)
    this.cascadeDown(index)
  }
}
