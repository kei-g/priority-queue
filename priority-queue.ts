import { assert } from 'console'

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
  private readonly indices: Map<K, number> = new Map<K, number>()
  private readonly items: T[] = [undefined]

  /**
   * コンストラクタ
   * @param comparator 比較関数
   * @param identifier 識別子選択関数
   */
  constructor(private readonly comparator: Comparator<T>,
    private readonly identifier?: Identifier<T, K>) {
  }

  /**
   * 指定した値を持つアイテムを追加する
   * @param value 値
   */
  add(value: T): void {
    const l = this.length + 1
    if (this.identifier)
      this.indices.set(this.identifier(value), l)
    this.items.push(value)
    this.cascadeUp(l)
  }

  private cascadeDown(i: number): void {
    const l = this.length
    for (let j = i * 2; j <= l; j *= 2) {
      const k = j + 1
      if (j < l && this.compare(j, k) < 0)
        j = k
      if (this.compare(i, j) < 0)
        this.swap(i, j)
      i = j
    }
  }

  private cascadeUp(i: number): void {
    while (1 < i) {
      const j = Math.floor(i / 2)
      if (this.compare(i, j) < 0)
        break
      this.swap(i, j)
      i = j
    }
  }

  private compare(lhs: number, rhs: number): number {
    return this.comparator(this.items[lhs], this.items[rhs])
  }

  /**
   * キューが空かどうか
   */
  get isEmpty(): boolean {
    return this.length === 0
  }

  private get length(): number {
    return this.items.length - 1
  }

  /**
   * 最も小さい値を取り出す
   * @returns 最小の値
   */
  pop(): T {
    if (this.isEmpty)
      throw new Error('No item in PriorityQueue')
    this.swap(1, this.length)
    const value = this.items.pop()
    if (this.identifier)
      this.indices.delete(this.identifier(value))
    this.cascadeDown(1)
    return value
  }

  private swap(i: number, j: number): void {
    const [u, v] = [this.items[i], this.items[j]]
    if (this.identifier) {
      this.indices.set(this.identifier(u), j)
      this.indices.set(this.identifier(v), i)
    }
    [this.items[i], this.items[j]] = [v, u]
  }

  /**
   * 指定された識別子を持つアイテムの順序を更新する
   * @param key 更新対象の識別子
   */
  update(key: K): void {
    const l = this.length
    if (l < 1)
      throw new Error('No item in PriorityQueue')
    if (!this.indices.has(key))
      throw new Error(`Not found in PriorityQueue, ${key}`)
    const i = this.indices.get(key)
    assert(i <= l)
    this.cascadeUp(i)
    this.cascadeDown(i)
  }
}
