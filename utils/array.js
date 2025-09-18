/**
 * 数组去重
 * @param {Array} arr 数组
 * @returns {Array} 去重后的数组
 */
export function unique(arr) {
  if (!Array.isArray(arr)) return []
  
  return [...new Set(arr)]
}

/**
 * 数组排序
 * @param {Array} arr 数组
 * @param {string} key 排序字段
 * @param {string} order 排序方式：asc/desc
 * @returns {Array} 排序后的数组
 */
export function sort(arr, key, order = 'asc') {
  if (!Array.isArray(arr)) return []
  
  return [...arr].sort((a, b) => {
    const valueA = key ? a[key] : a
    const valueB = key ? b[key] : b
    
    if (order === 'asc') {
      return valueA > valueB ? 1 : -1
    } else {
      return valueA < valueB ? 1 : -1
    }
  })
}

/**
 * 数组分组
 * @param {Array} arr 数组
 * @param {string} key 分组字段
 * @returns {Object} 分组后的对象
 */
export function groupBy(arr, key) {
  if (!Array.isArray(arr)) return {}
  
  return arr.reduce((result, item) => {
    const groupKey = item[key]
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
    return result
  }, {})
}

/**
 * 数组过滤
 * @param {Array} arr 数组
 * @param {Function} predicate 过滤函数
 * @returns {Array} 过滤后的数组
 */
export function filter(arr, predicate) {
  if (!Array.isArray(arr)) return []
  
  return arr.filter(predicate)
}

/**
 * 数组映射
 * @param {Array} arr 数组
 * @param {Function} mapper 映射函数
 * @returns {Array} 映射后的数组
 */
export function map(arr, mapper) {
  if (!Array.isArray(arr)) return []
  
  return arr.map(mapper)
}

/**
 * 数组求和
 * @param {Array} arr 数组
 * @param {string} key 求和字段
 * @returns {number} 求和结果
 */
export function sum(arr, key) {
  if (!Array.isArray(arr)) return 0
  
  return arr.reduce((total, item) => {
    return total + (key ? Number(item[key]) || 0 : Number(item) || 0)
  }, 0)
}

/**
 * 数组平均值
 * @param {Array} arr 数组
 * @param {string} key 平均值字段
 * @returns {number} 平均值
 */
export function average(arr, key) {
  if (!Array.isArray(arr) || arr.length === 0) return 0
  
  return sum(arr, key) / arr.length
}

/**
 * 数组最大值
 * @param {Array} arr 数组
 * @param {string} key 最大值字段
 * @returns {number} 最大值
 */
export function max(arr, key) {
  if (!Array.isArray(arr) || arr.length === 0) return 0
  
  return Math.max(...arr.map(item => key ? Number(item[key]) || 0 : Number(item) || 0))
}

/**
 * 数组最小值
 * @param {Array} arr 数组
 * @param {string} key 最小值字段
 * @returns {number} 最小值
 */
export function min(arr, key) {
  if (!Array.isArray(arr) || arr.length === 0) return 0
  
  return Math.min(...arr.map(item => key ? Number(item[key]) || 0 : Number(item) || 0))
}

/**
 * 数组扁平化
 * @param {Array} arr 数组
 * @returns {Array} 扁平化后的数组
 */
export function flatten(arr) {
  if (!Array.isArray(arr)) return []
  
  return arr.reduce((result, item) => {
    return result.concat(Array.isArray(item) ? flatten(item) : item)
  }, [])
}

/**
 * 数组分页
 * @param {Array} arr 数组
 * @param {number} page 页码
 * @param {number} size 每页大小
 * @returns {Array} 分页后的数组
 */
export function paginate(arr, page, size) {
  if (!Array.isArray(arr)) return []
  
  const start = (page - 1) * size
  const end = start + size
  
  return arr.slice(start, end)
}

/**
 * 数组随机打乱
 * @param {Array} arr 数组
 * @returns {Array} 打乱后的数组
 */
export function shuffle(arr) {
  if (!Array.isArray(arr)) return []
  
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  
  return result
}

/**
 * 数组交集
 * @param {Array} arr1 数组1
 * @param {Array} arr2 数组2
 * @returns {Array} 交集数组
 */
export function intersection(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return []
  
  return arr1.filter(item => arr2.includes(item))
}

/**
 * 数组并集
 * @param {Array} arr1 数组1
 * @param {Array} arr2 数组2
 * @returns {Array} 并集数组
 */
export function union(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return []
  
  return [...new Set([...arr1, ...arr2])]
}

/**
 * 数组差集
 * @param {Array} arr1 数组1
 * @param {Array} arr2 数组2
 * @returns {Array} 差集数组
 */
export function difference(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return []
  
  return arr1.filter(item => !arr2.includes(item))
} 