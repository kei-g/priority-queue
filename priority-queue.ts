/**
 * 比較関数
 */
export type Comparator<T> = (lhs: T, rhs: T) => number

/**
 * 優先度付きキュー
 */
export class PriorityQueue<T> {
  private readonly items: T[] = [undefined]

  /**
   * コンストラクタ
   * @param comparator 比較関数
   */
  constructor(private readonly comparator: Comparator<T>) {
  }

  /**
   * 指定した値を持つアイテムを追加する
   * @param value 値
   */
  add(value: T): void {
    this.items.push(value)
    this.cascadeUp(this.length)
  }

  private cascadeDown(i: number): void {
    for (let j = i * 2; j <= this.length; j *= 2) {
      const k = j + 1
      if (j < this.length && this.compare(j, k) < 0)
        j = k
      if (this.compare(i, j) < 0)
        this.swap(i, j)
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
    this.cascadeDown(1)
    return value
  }

  private swap(i: number, j: number): void {
    [this.items[i], this.items[j]] = [this.items[j], this.items[i]]
  }

  /**
   * 指定された値を持つアイテムの順序を更新する
   * @param value 更新対象の値
   */
  update(value: T): void {
    let [i, j] = [1, this.length]
    while (i < j) {
      const k = Math.floor((i + j) / 2)
      const item = this.items[k + 1]
      if (this.comparator(item, value) < 0)
        i = k + 1
      else
        j = k
    }
    this.cascadeDown(i)
  }
}
