/**
 * 对象深拷贝
 * @param {Object} obj 对象
 * @returns {Object} 拷贝后的对象
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item))
  }
  
  const result = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = deepClone(obj[key])
    }
  }
  
  return result
}

/**
 * 对象合并
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @returns {Object} 合并后的对象
 */
export function merge(target, source) {
  if (!target || typeof target !== 'object') return source
  if (!source || typeof source !== 'object') return target
  
  const result = deepClone(target)
  
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = merge(result[key], source[key])
      } else {
        result[key] = deepClone(source[key])
      }
    }
  }
  
  return result
}

/**
 * 对象过滤
 * @param {Object} obj 对象
 * @param {Function} predicate 过滤函数
 * @returns {Object} 过滤后的对象
 */
export function filter(obj, predicate) {
  if (!obj || typeof obj !== 'object') return {}
  
  const result = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && predicate(obj[key], key)) {
      result[key] = obj[key]
    }
  }
  
  return result
}

/**
 * 对象映射
 * @param {Object} obj 对象
 * @param {Function} mapper 映射函数
 * @returns {Object} 映射后的对象
 */
export function map(obj, mapper) {
  if (!obj || typeof obj !== 'object') return {}
  
  const result = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = mapper(obj[key], key)
    }
  }
  
  return result
}

/**
 * 对象转数组
 * @param {Object} obj 对象
 * @returns {Array} 转换后的数组
 */
export function toArray(obj) {
  if (!obj || typeof obj !== 'object') return []
  
  return Object.keys(obj).map(key => ({
    key,
    value: obj[key]
  }))
}

/**
 * 数组转对象
 * @param {Array} arr 数组
 * @param {string} key 键字段
 * @param {string} value 值字段
 * @returns {Object} 转换后的对象
 */
export function toObject(arr, key = 'key', value = 'value') {
  if (!Array.isArray(arr)) return {}
  
  return arr.reduce((result, item) => {
    result[item[key]] = item[value]
    return result
  }, {})
}

/**
 * 对象转查询字符串
 * @param {Object} obj 对象
 * @returns {string} 查询字符串
 */
export function toQueryString(obj) {
  if (!obj || typeof obj !== 'object') return ''
  
  return Object.keys(obj)
    .filter(key => obj[key] !== undefined && obj[key] !== null && obj[key] !== '')
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&')
}

/**
 * 查询字符串转对象
 * @param {string} str 查询字符串
 * @returns {Object} 对象
 */
export function fromQueryString(str) {
  if (!str) return {}
  
  return str.split('&').reduce((result, item) => {
    const [key, value] = item.split('=')
    if (key) {
      result[decodeURIComponent(key)] = decodeURIComponent(value || '')
    }
    return result
  }, {})
}

/**
 * 对象转FormData
 * @param {Object} obj 对象
 * @returns {FormData} FormData对象
 */
export function toFormData(obj) {
  if (!obj || typeof obj !== 'object') return new FormData()
  
  const formData = new FormData()
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      formData.append(key, obj[key])
    }
  }
  
  return formData
}

/**
 * FormData转对象
 * @param {FormData} formData FormData对象
 * @returns {Object} 对象
 */
export function fromFormData(formData) {
  if (!(formData instanceof FormData)) return {}
  
  const result = {}
  for (const [key, value] of formData.entries()) {
    result[key] = value
  }
  
  return result
}

/**
 * 对象转JSON字符串
 * @param {Object} obj 对象
 * @param {number} space 缩进空格数
 * @returns {string} JSON字符串
 */
export function toJSON(obj, space = 2) {
  if (!obj || typeof obj !== 'object') return '{}'
  
  return JSON.stringify(obj, null, space)
}

/**
 * JSON字符串转对象
 * @param {string} str JSON字符串
 * @returns {Object} 对象
 */
export function fromJSON(str) {
  if (!str) return {}
  
  try {
    return JSON.parse(str)
  } catch (e) {
    return {}
  }
}

/**
 * 对象转URL参数
 * @param {Object} obj 对象
 * @returns {string} URL参数
 */
export function toURLParams(obj) {
  if (!obj || typeof obj !== 'object') return ''
  
  return Object.keys(obj)
    .filter(key => obj[key] !== undefined && obj[key] !== null && obj[key] !== '')
    .map(key => `${key}=${obj[key]}`)
    .join('&')
}

/**
 * URL参数转对象
 * @param {string} str URL参数
 * @returns {Object} 对象
 */
export function fromURLParams(str) {
  if (!str) return {}
  
  return str.split('&').reduce((result, item) => {
    const [key, value] = item.split('=')
    if (key) {
      result[key] = value || ''
    }
    return result
  }, {})
} 