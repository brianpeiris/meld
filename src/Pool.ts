export class Pool {
  private pools = {};
  private immutablePools = {};

  get(key: string, generator: Function) {
    if (!this.pools[key]) {
      this.pools[key] = { used: 0, items: [] };
    }
    const pool = this.pools[key];
    pool.used++;
    if (!pool.items[pool.used - 1]) {
      pool.items.push(generator());
    }
    return pool.items[pool.used - 1];
  }

  getImmutable(key: Array<any>, generator: Function) {
    const keyStr = key.join("-");
    if (!this.immutablePools[keyStr]) {
      this.immutablePools[keyStr] = generator();
    }
    return this.immutablePools[keyStr];
  }

  reset() {
    for (const key in this.pools) {
      this.pools[key].used = 0;
    }
  }
}
