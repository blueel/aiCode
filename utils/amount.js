/**
 * 格式化金额
 * @param {number|string} amount 金额
 * @param {number} decimals 小数位数，默认2位
 * @param {string} decimalSeparator 小数点符号，默认.
 * @param {string} thousandsSeparator 千分位符号，默认,
 * @returns {string} 格式化后的金额字符串
 */
export function formatAmount(amount, decimals = 2, decimalSeparator = '.', thousandsSeparator = ',') {
  if (amount === null || amount === undefined || amount === '') return '0.00'
  
  amount = Number(amount)
  if (isNaN(amount)) return '0.00'
  
  const negative = amount < 0
  amount = Math.abs(amount)
  
  let result = amount.toFixed(decimals)
  
  // 处理小数部分
  const parts = result.split('.')
  let integerPart = parts[0]
  const decimalPart = parts[1] || ''
  
  // 处理整数部分
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)
  
  // 组合结果
  result = integerPart
  if (decimalPart) {
    result += decimalSeparator + decimalPart
  }
  
  return (negative ? '-' : '') + result
}

/**
 * 将金额转换为中文大写
 * @param {number|string} amount 金额
 * @returns {string} 中文大写金额
 */
export function toChineseAmount(amount) {
  if (amount === null || amount === undefined || amount === '') return '零元整'
  
  amount = Number(amount)
  if (isNaN(amount)) return '零元整'
  
  const negative = amount < 0
  amount = Math.abs(amount)
  
  // 数字对应中文
  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const units = ['', '拾', '佰', '仟']
  const bigUnits = ['', '万', '亿']
  
  // 处理小数部分
  const parts = amount.toFixed(2).split('.')
  let integerPart = parts[0]
  const decimalPart = parts[1]
  
  let result = ''
  
  // 处理整数部分
  if (integerPart !== '0') {
    let zero = false
    let unit = 0
    
    for (let i = integerPart.length - 1; i >= 0; i--) {
      const digit = parseInt(integerPart[i])
      
      if (digit === 0) {
        zero = true
      } else {
        if (zero) {
          result = digits[0] + result
          zero = false
        }
        result = digits[digit] + units[unit] + result
      }
      
      unit++
      if (unit === 4) {
        unit = 0
        const bigUnit = bigUnits[Math.floor((integerPart.length - i) / 4)]
        if (bigUnit) {
          result = bigUnit + result
        }
      }
    }
    
    result += '元'
  }
  
  // 处理小数部分
  if (decimalPart) {
    const jiao = parseInt(decimalPart[0])
    const fen = parseInt(decimalPart[1])
    
    if (jiao || fen) {
      if (jiao) {
        result += digits[jiao] + '角'
      }
      if (fen) {
        result += digits[fen] + '分'
      }
    } else {
      result += '整'
    }
  } else {
    result += '整'
  }
  
  return (negative ? '负' : '') + result
}

/**
 * 将金额转换为带单位的字符串
 * @param {number|string} amount 金额
 * @param {number} decimals 小数位数，默认2位
 * @returns {string} 带单位的金额字符串
 */
export function toUnitAmount(amount, decimals = 2) {
  if (amount === null || amount === undefined || amount === '') return '0'
  
  amount = Number(amount)
  if (isNaN(amount)) return '0'
  
  const units = [
    { value: 1e12, unit: '万亿' },
    { value: 1e8, unit: '亿' },
    { value: 1e4, unit: '万' }
  ]
  
  for (const { value, unit } of units) {
    if (amount >= value) {
      return (amount / value).toFixed(decimals) + unit
    }
  }
  
  return amount.toFixed(decimals)
}

/**
 * 将金额转换为百分比
 * @param {number|string} amount 金额
 * @param {number} decimals 小数位数，默认2位
 * @returns {string} 百分比字符串
 */
export function toPercent(amount, decimals = 2) {
  if (amount === null || amount === undefined || amount === '') return '0%'
  
  amount = Number(amount)
  if (isNaN(amount)) return '0%'
  
  return (amount * 100).toFixed(decimals) + '%'
}

/**
 * 将金额转换为科学计数法
 * @param {number|string} amount 金额
 * @param {number} decimals 小数位数，默认2位
 * @returns {string} 科学计数法字符串
 */
export function toScientific(amount, decimals = 2) {
  if (amount === null || amount === undefined || amount === '') return '0'
  
  amount = Number(amount)
  if (isNaN(amount)) return '0'
  
  return amount.toExponential(decimals)
} 