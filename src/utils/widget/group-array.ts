/**
 * 数组处理方法
 */

class GroupArray {
  /**
   * 临时 对象排序 倒序
   */
  public static sortObj(data: Type.Object): any {
    const newData: Type.Object = {}
    Object.keys(data)
      .sort((a: any, b: any) => {
        return b.replace(/-/g, '') - a.replace(/-/g, '')
      })
      .map((key) => {
        newData[key] = data[key]
      })
    return newData
  }

  private originalArray: Array<string | number | object>

  constructor(originalArray = []) {
    this.originalArray = originalArray
  }

  public groupByKey(key: string): any[] {
    return this.groupBy((item) => {
      return [item[key]]
    })
  }

  private groupBy(fn: (item: any) => void): any[] {
    const groups: Type.Object = {}
    for (const item of this.originalArray) {
      const group = JSON.stringify(fn(item))
      groups[group] = groups[group] || []
      groups[group].push(item)
    }
    return Object.keys(groups).map((group) => {
      return groups[group]
    })
  }
}

export default GroupArray
