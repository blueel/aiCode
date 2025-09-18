/**
 * 格式化日期
 * @param {Date|string|number} date 日期对象/日期字符串/时间戳
 * @param {string} format 格式化模板，默认：yyyy-MM-dd HH:mm:ss
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date, format = 'yyyy-MM-dd HH:mm:ss') {
  if (!date) return ''
  
  if (typeof date === 'string') {
    date = new Date(date.replace(/-/g, '/'))
  } else if (typeof date === 'number') {
    date = new Date(date)
  }
  
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  
  return format
}

/**
 * 获取相对时间
 * @param {Date|string|number} date 日期对象/日期字符串/时间戳
 * @returns {string} 相对时间字符串
 */
export function getRelativeTime(date) {
  if (!date) return ''
  
  if (typeof date === 'string') {
    date = new Date(date.replace(/-/g, '/'))
  } else if (typeof date === 'number') {
    date = new Date(date)
  }
  
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const month = 30 * day
  const year = 365 * day
  
  if (diff < minute) {
    return '刚刚'
  } else if (diff < hour) {
    return Math.floor(diff / minute) + '分钟前'
  } else if (diff < day) {
    return Math.floor(diff / hour) + '小时前'
  } else if (diff < month) {
    return Math.floor(diff / day) + '天前'
  } else if (diff < year) {
    return Math.floor(diff / month) + '个月前'
  } else {
    return Math.floor(diff / year) + '年前'
  }
}

/**
 * 获取日期范围
 * @param {string} type 范围类型：today/week/month/year
 * @returns {[Date, Date]} 开始日期和结束日期
 */
export function getDateRange(type) {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const day = now.getDate()
  
  let start, end
  
  switch (type) {
    case 'today':
      start = new Date(year, month, day)
      end = new Date(year, month, day + 1)
      break
    case 'week':
      const week = now.getDay()
      start = new Date(year, month, day - week)
      end = new Date(year, month, day - week + 7)
      break
    case 'month':
      start = new Date(year, month, 1)
      end = new Date(year, month + 1, 1)
      break
    case 'year':
      start = new Date(year, 0, 1)
      end = new Date(year + 1, 0, 1)
      break
    default:
      start = new Date(year, month, day)
      end = new Date(year, month, day + 1)
  }
  
  return [start, end]
}

/**
 * 判断是否为同一天
 * @param {Date} date1 日期1
 * @param {Date} date2 日期2
 * @returns {boolean} 是否为同一天
 */
export function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
}

/**
 * 获取月份天数
 * @param {number} year 年份
 * @param {number} month 月份（0-11）
 * @returns {number} 天数
 */
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * 获取星期几
 * @param {Date} date 日期
 * @returns {string} 星期几
 */
export function getDayOfWeek(date) {
  const days = ['日', '一', '二', '三', '四', '五', '六']
  return days[date.getDay()]
} 