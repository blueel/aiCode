/**
 * 格式化字符串
 * @param {string} str 模板字符串
 * @param {Object} data 数据对象
 * @returns {string} 格式化后的字符串
 */
export function formatString(str, data) {
  if (!str || !data) return str
  
  return str.replace(/\{(\w+)\}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : match
  })
}

/**
 * 截取字符串
 * @param {string} str 字符串
 * @param {number} length 截取长度
 * @param {string} suffix 后缀，默认...
 * @returns {string} 截取后的字符串
 */
export function truncateString(str, length, suffix = '...') {
  if (!str) return ''
  
  if (str.length <= length) return str
  
  return str.substring(0, length) + suffix
}

/**
 * 隐藏字符串
 * @param {string} str 字符串
 * @param {number} start 开始位置
 * @param {number} end 结束位置
 * @param {string} mask 掩码字符，默认*
 * @returns {string} 隐藏后的字符串
 */
export function maskString(str, start, end, mask = '*') {
  if (!str) return ''
  
  const length = str.length
  if (start >= length || end >= length || start > end) return str
  
  const prefix = str.substring(0, start)
  const suffix = str.substring(end + 1)
  const masked = mask.repeat(end - start + 1)
  
  return prefix + masked + suffix
}

/**
 * 格式化手机号码
 * @param {string} phone 手机号码
 * @returns {string} 格式化后的手机号码
 */
export function formatPhone(phone) {
  if (!phone) return ''
  
  phone = phone.replace(/\D/g, '')
  
  if (phone.length === 11) {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')
  }
  
  return phone
}

/**
 * 格式化身份证号码
 * @param {string} idCard 身份证号码
 * @returns {string} 格式化后的身份证号码
 */
export function formatIdCard(idCard) {
  if (!idCard) return ''
  
  idCard = idCard.replace(/\D/g, '')
  
  if (idCard.length === 18) {
    return idCard.replace(/(\d{6})(\d{8})(\d{4})/, '$1 $2 $3')
  }
  
  return idCard
}

/**
 * 格式化银行卡号
 * @param {string} cardNo 银行卡号
 * @returns {string} 格式化后的银行卡号
 */
export function formatBankCard(cardNo) {
  if (!cardNo) return ''
  
  cardNo = cardNo.replace(/\D/g, '')
  
  return cardNo.replace(/(\d{4})/g, '$1 ').trim()
}

/**
 * 格式化姓名
 * @param {string} name 姓名
 * @returns {string} 格式化后的姓名
 */
export function formatName(name) {
  if (!name) return ''
  
  // 去除空格
  name = name.trim()
  
  // 处理复姓
  const compoundSurnames = ['欧阳', '太史', '端木', '上官', '司马', '东方', '独孤', '南宫', '万俟', '闻人', '夏侯', '诸葛', '尉迟', '公羊', '赫连', '澹台', '皇甫', '宗政', '濮阳', '公冶', '太叔', '申屠', '公孙', '慕容', '仲孙', '钟离', '长孙', '宇文', '司徒', '鲜于', '司空', '闾丘', '子车', '亓官', '司寇', '巫马', '公西', '颛孙', '壤驷', '公良', '漆雕', '乐正', '宰父', '谷梁', '拓跋', '夹谷', '轩辕', '令狐', '段干', '百里', '呼延', '东郭', '南门', '羊舌', '微生', '公户', '公玉', '公仪', '梁丘', '公仲', '公上', '公门', '公山', '公坚', '左丘', '公伯', '西门', '公祖', '第五', '公乘', '贯丘', '公皙', '南荣', '东里', '东宫', '仲长', '子书', '子桑', '即墨', '达奚', '褚师']
  
  for (const surname of compoundSurnames) {
    if (name.startsWith(surname)) {
      return surname + ' ' + name.substring(surname.length)
    }
  }
  
  // 单姓
  return name.substring(0, 1) + ' ' + name.substring(1)
}

/**
 * 格式化地址
 * @param {string} address 地址
 * @returns {string} 格式化后的地址
 */
export function formatAddress(address) {
  if (!address) return ''
  
  // 去除空格
  address = address.trim()
  
  // 处理省市区
  const provinces = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '台湾', '香港', '澳门']
  
  for (const province of provinces) {
    if (address.startsWith(province)) {
      return province + ' ' + address.substring(province.length)
    }
  }
  
  return address
}

/**
 * 格式化时间
 * @param {string} time 时间
 * @returns {string} 格式化后的时间
 */
export function formatTime(time) {
  if (!time) return ''
  
  time = time.replace(/\D/g, '')
  
  if (time.length === 6) {
    return time.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3')
  }
  
  return time
}

/**
 * 格式化日期
 * @param {string} date 日期
 * @returns {string} 格式化后的日期
 */
export function formatDate(date) {
  if (!date) return ''
  
  date = date.replace(/\D/g, '')
  
  if (date.length === 8) {
    return date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
  }
  
  return date
} 